import User from '../Models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    
    const isValidUser = await User.findOne({email});

    if(isValidUser){
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