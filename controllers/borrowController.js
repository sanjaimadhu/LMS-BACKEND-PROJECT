import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Borrow } from "../models/borrowModel.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import { calculateFine } from "../utlis/fineCalculator.js";

// 1. Record Borrowed Book (Borrowing Logic)
export const recordBorrowedBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // Book ID
    const { email } = req.body;

    const book = await Book.findById(id);
    if (!book) {
        return next(new ErrorHandler("Book not found.", 404));
    }

    const user = await User.findOne({ email, accountVerified: true });
    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    if (book.quantity === 0) {
        return next(new ErrorHandler("Book not available.", 400));
    }

    const isAlreadyBorrowed = user.borrowedBooks.find(
        (b) => b.bookId.toString() === id && b.returned === false
    );
    if (isAlreadyBorrowed) {
        return next(new ErrorHandler("This book has already been borrowed by you.", 400));
    }

    const activeBorrows = user.borrowedBooks.filter(b => b.returned === false);
    if (activeBorrows.length >= 3) {
        return next(new ErrorHandler("You have already borrowed 3 books. Please return a book to borrow a new one.", 400));
    }

    if (user.notifications && user.notifications.length > 0) {
        user.notifications.forEach((notif) => {
            if (notif.bookId && notif.bookId.toString() === id.toString()) {
                notif.status = "hidden"; 
            }
        });
    }

    user.reservedBooks = user.reservedBooks.filter(
        (reservedId) => reservedId.toString() !== id.toString()
    );

    book.quantity -= 1;
    book.availability = book.quantity > 0;

    if (book.reservedBy && book.reservedBy.toString() === user._id.toString()) {
        book.reservedBy = null;
    }

    await book.save();

    user.borrowedBooks.push({
        bookId: book._id,
        bookTitle: book.title,
        borrowedDate: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        returned: false 
    });
    
    await user.save({ validateBeforeSave: false });

    await Borrow.create({
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        book: book._id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        price: book.price,
    });

    res.status(200).json({
        success: true,
        message: "Borrowed book recorded and notification cleared successfully.",
    });
});

// 2. Return Book (Return Logic)
export const returnBorrowBook = catchAsyncErrors(async (req, res, next) => {
    const { bookId } = req.params;
    const { email } = req.body;

    const actualBookId = (bookId && typeof bookId === 'object') ? bookId._id : bookId;

    if (!actualBookId || actualBookId === "undefined" || actualBookId.length < 24) {
        return next(new ErrorHandler("Book not found.", 404));
    }

    let book;
    try {
        book = await Book.findById(actualBookId);
    } catch (err) {
        return next(new ErrorHandler("Invalid Book ID format.", 400));
    }

    if (!book) {
        return next(new ErrorHandler("Book not found.", 404));
    }

    const user = await User.findOne({ email, accountVerified: true });
    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    const borrowedBook = user.borrowedBooks.find(
        (b) => b.bookId.toString() === actualBookId.toString() && b.returned === false
    );

    if (!borrowedBook) {
        return next(new ErrorHandler("You have not borrowed this book or it has already been returned.", 400));
    }

    borrowedBook.returned = true;
    await user.save({ validateBeforeSave: false });

    book.quantity += 1;
    book.availability = book.quantity > 0;
    await book.save();

    const borrow = await Borrow.findOne({
        book: actualBookId,
        "user.email": email,
        returnDate: null,
    });

    if (!borrow) {
        return next(new ErrorHandler("Borrow record not found.", 400));
    }

    borrow.returnDate = new Date();
    const fine = calculateFine(borrow.dueDate);
    borrow.fine = fine;
    await borrow.save();

    res.status(200).json({
        success: true,
        message: fine !== 0 
            ? `The book has been returned successfully. Total charges: $${fine + book.price}`
            : `The book has been returned successfully. Total charges: $${book.price}`,
    });
});

// 3. Admin Functions
export const borrowedBooks = catchAsyncErrors(async (req, res, next) => {
    const { borrowedBooks } = req.user;
    res.status(200).json({
        success: true,
        borrowedBooks,
    });
});

// --- DYNAMIC FINE CALCULATION LOGIC UPDATED HERE ---
export const getBorrowedBookForAdmin = catchAsyncErrors(async (req, res, next) => {
    const allBorrows = await Borrow.find().populate("book");
    const today = new Date();

    const borrowedBooksWithFine = allBorrows.map((record) => {
        let currentFine = record.fine;

        // Innum return pannala na matum dynamic-a calculate pannanum
        if (!record.returnDate) {
            const dueDate = new Date(record.dueDate);
            if (today > dueDate) {
                const diffTime = today - dueDate;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                currentFine = diffDays * 10; // Per day 10 rupees fine logic
            }
        }

        // Return calculated data as a new object
        return {
            ...record._doc,
            fine: currentFine
        };
    });

    res.status(200).json({
        success: true,
        borrowedBooks: borrowedBooksWithFine,
    });
});

export const updateFine = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { fine } = req.body;

    const borrow = await Borrow.findById(id);
    if (!borrow) {
        return next(new ErrorHandler("Borrow record not found.", 404));
    }

    borrow.fine = fine;
    await borrow.save();

    res.status(200).json({
        success: true,
        message: "Fine updated successfully.",
        borrow,
    });
});