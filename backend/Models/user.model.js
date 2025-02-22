import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false, // Exclude password from query results by default
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add a pre-save hook for password hashing (optional, if using bcrypt later)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    // Hash password logic goes here (if implemented)
    next();
});

// Index for better query performance
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export default User;
