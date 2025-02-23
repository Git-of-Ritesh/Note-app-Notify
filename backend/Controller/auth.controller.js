import User from '../Models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHndler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// User signup
export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHndler(400, 'User already exists'));
        }

        // Hash password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create and save the new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        next(errorHndler(500, 'Failed to create user'));
    }
};

// User signin (login)
export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(errorHndler(404, 'User not found'));
        }

        // Compare hashed password
        const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return next(errorHndler(401, 'Invalid credentials'));
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Remove password from the response
        const { password: _, ...userData } = user._doc;

        // Set cookie with token
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }).status(200).json({ success: true, message: 'Logged in successfully', user: userData });
    } catch (error) {
        next(errorHndler(500, 'Failed to sign in'));
    }
};

// User signout (logout)
export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token')
        .status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        next(errorHndler(500, 'Failed to log out'));
    }
};
