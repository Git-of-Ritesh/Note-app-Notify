// import { errorHndler }  from './error.js';
// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {

// const token = req.cookies.access_token;

// if(!token){
//     return next(errorHndler(401, 'Unauthorized'));
// }

// jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if(err){
//         return next(errorHndler(401, 'forbidden'));
//     }

//     req.user = user;
//     next();
// });

// }

import { errorHndler } from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token; // Ensure cookies are correctly parsed

    console.log('Incoming cookies:', req.cookies); // Debugging for Safari

    if (!token) {
        console.log('No token found in cookies');
        return next(errorHndler(401, 'Unauthorized: No token provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return next(errorHndler(403, 'Forbidden: Invalid token'));
        }

        req.user = user; // Attach user info to req for next middleware
        next();
    });
};

