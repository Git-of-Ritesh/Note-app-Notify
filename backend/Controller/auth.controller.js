import User from '../Models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHndler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    const isValidUser = await User.findOne({ email });

    if (isValidUser) {
        return next(errorHndler(400, 'User already exists'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User created successfully'
        });
    } catch (error) {
        return next(errorHndler(500, 'Internal Server Error'));
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHndler(404, 'User not found'));
        }

        const isPasswordValid = bcryptjs.compareSync(password, validUser.password);

        if (!isPasswordValid) {
            return next(errorHndler(401, 'Invalid credentials'));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;

        res.cookie("access_token", token, { httpOnly: true, }).status(200).json({
            success: true,
            message: "logged in successfully",
            rest,
        });
    } catch (error) {
        next(error);
    }
}

export const signout = async (req, res, next) => {
    try {
        res.clearCookie("access_token").status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        next(error);
    }
}