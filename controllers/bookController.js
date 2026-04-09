import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Borrow } from "../models/borrowModel.js";
import { v2 as cloudinary } from "cloudinary";

// --- Add New Book with Cloudinary Integration ---
export const addBook = catchAsyncErrors(async (req, res, next) => {
  const { title, author, description, price, quantity, publicationYear, ISBN } = req.body;
  
  if (!title || !author || !description || !price || !quantity || !publicationYear || !ISBN) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  // Image Check
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Book Cover Image Required!", 400));
  }

  const { bookImage } = req.files;

  // Cloudinary Upload Logic
  const cloudinaryResponse = await cloudinary.uploader.upload(
    bookImage.tempFilePath,
    { folder: "LIBRARY_BOOKS" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  }

  const book = await Book.create({
    title,
    author,
    description,
    price,
    quantity,
    publicationYear,
    ISBN,
    bookImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url, 
    },
  });
  
  res.status(201).json({
    success: true,
    message: "Book added successfully.",
    book
  });
});

// --- Get All Books ---
export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find();
  
  res.status(200).json({
    success: true,
    books,
  });
});

// --- Delete Book ---
export const deleteBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  
  if (!book) {
    return next(new ErrorHandler("Book not found.", 404));
  }
  
  // Optional: Cloudinary delete logic
  if (book.bookImage && book.bookImage.public_id) {
    await cloudinary.uploader.destroy(book.bookImage.public_id);
  }

  await book.deleteOne();
  
  res.status(200).json({
    success: true,
    message: "Book deleted successfully.",
  });
});

// --- Update Book (Fixed for Image Validation) ---
export const updateBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let book = await Book.findById(id);
  
  if (!book) {
    return next(new ErrorHandler("Book not found.", 404));
  }

  let dataToUpdate = { ...req.body };

  // Image update logic
  if (req.files && req.files.bookImage) {
    const file = req.files.bookImage;

    // Delete old image
    if (book.bookImage && book.bookImage.public_id) {
      await cloudinary.uploader.destroy(book.bookImage.public_id);
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: "LIBRARY_BOOKS" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
    }

    dataToUpdate.bookImage = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  } else {
    // Image varala-na path-ai delete panniduvom, appo thaan pazhayadhu maintain aagum
    delete dataToUpdate.bookImage;
  }

  book = await Book.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  
  res.status(200).json({
    success: true,
    message: "Book updated successfully.",
    book,
  });
});

// --- Create/Update Review ---
export const createBookReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment } = req.body;
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found.", 404));
  }

  const isReviewed = book.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    book.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = Number(rating);
        rev.comment = comment;
        rev.userName = req.user.name;
      }
    });
  } else {
    book.reviews.push({
      user: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      comment,
    });
    book.numReviews = book.reviews.length;
  }

  book.rating = book.reviews.reduce((acc, item) => item.rating + acc, 0) / book.reviews.length;

  await book.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review added successfully!",
  });
});

// --- Delete Review ---
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { bookId, reviewId } = req.query;
  const book = await Book.findById(bookId);

  if (!book) {
    return next(new ErrorHandler("Book not found.", 404));
  }

  const reviews = book.reviews.filter(
    (rev) => rev._id.toString() !== reviewId.toString()
  );

  const numReviews = reviews.length;
  const rating = numReviews === 0 ? 0 : reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;

  await Book.findByIdAndUpdate(
    bookId,
    { reviews, rating, numReviews },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Review deleted successfully.",
  });
});

// --- Get All Reviews ---
export const getBookReviews = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.query.id).populate("reviews.user");

  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: book.reviews,
  });
});

// --- Reserve a Book ---
export const reserveBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;

    const book = await Book.findById(id);

    if (!book) {
        return next(new ErrorHandler("Book not found.", 404));
    }

    if (book.quantity > 0) {
        return next(new ErrorHandler("This book is available. You don't need to reserve it.", 400));
    }

    const user = await User.findById(userId);

    const isAlreadyReserved = user.reservedBooks.find(
        (bookId) => bookId.toString() === id.toString()
    );

    if (isAlreadyReserved) {
        return next(new ErrorHandler("You have already reserved this book.", 400));
    }

    user.reservedBooks.push(id);
    await user.save({ validateBeforeSave: false });

    book.reservedBy = userId; 
    await book.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Book reserved successfully!",
    });
});

// --- Return Book Logic ---
export const returnBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) return next(new ErrorHandler("Book not found.", 404));

    const waitingUserId = book.reservedBy;

    book.quantity += 1;
    book.availability = true;
    
    if (waitingUserId) {
        const friend = await User.findById(waitingUserId);
        if (friend) {
            friend.notifications.push({
                message: `The book "${book.title}" is now available for you!`,
                bookId: book._id,
            });
            
            friend.reservedBooks = friend.reservedBooks.filter(
                (bId) => bId.toString() !== id.toString()
            );
            await friend.save({ validateBeforeSave: false });
        }
    }

    book.reservedBy = null; 
    await book.save();

    res.status(200).json({
        success: true,
        message: "Book returned successfully.",
    });
});

// --- Get My Reserved Books ---
export const getMyReservedBooks = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("reservedBooks");

    res.status(200).json({
        success: true,
        reservedBooks: user.reservedBooks,
    });
});

// --- Cancel Reservation ---
export const cancelReservation = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params; 
  const userId = req.user._id;

  const book = await Book.findById(id);
  if (!book) {
      return next(new ErrorHandler("Book not found.", 404));
  }

  const user = await User.findById(userId);
  user.reservedBooks = user.reservedBooks.filter(
      (bookId) => bookId.toString() !== id.toString()
  );
  await user.save({ validateBeforeSave: false });

  if (book.reservedBy && book.reservedBy.toString() === userId.toString()) {
      book.reservedBy = null;
      await book.save({ validateBeforeSave: false });
  }

  res.status(200).json({
      success: true,
      message: "Reservation cancelled successfully.",
  });
});

// --- Admin: Get All Users Reservations ---
export const getAllReservations = catchAsyncErrors(async (req, res, next) => {
  const reservations = await User.find({ 
    reservedBooks: { $exists: true, $not: { $size: 0 } } 
  }).select("name email reservedBooks").populate("reservedBooks", "title author ISBN quantity");

  res.status(200).json({
    success: true,
    reservations,
  });
});

// --- Admin: Delete/Clear Reservation ---
export const deleteReservation = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params; 

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  if (user.reservedBooks && user.reservedBooks.length > 0) {
    for (let bookId of user.reservedBooks) {
      const book = await Book.findById(bookId);
      if (book && book.reservedBy && book.reservedBy.toString() === id.toString()) {
        book.reservedBy = null;
        await book.save({ validateBeforeSave: false });
      }
    }
  }

  user.reservedBooks = [];
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Reservation cleared successfully.",
  });
});