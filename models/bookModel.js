import mongoose from "mongoose";

// --- Review Schema ---
const reviewSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    },
    userName: { 
        type: String, 
        required: true ,
    },
    rating: { 
        type: Number, 
        required: true,
        min: 1,
        max: 5
    },
    comment: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });

// --- Book Schema ---
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    // --- ADDED: Book Image for Cloudinary ---
    bookImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    availability: {
        type: Boolean,
        default: true,
    },
    publicationYear: { 
        type: Number,
        required: true,
    },
    ISBN: { 
        type: String, 
        unique: true, 
    },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },

    // --- RESERVATION LOGIC FIELD ---
    waitingList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }

}, {
    timestamps: true,
});

export const Book = mongoose.model("Book", bookSchema);