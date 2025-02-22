import { errorHndler } from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.access_token;

        console.log('Incoming cookies:', req.cookies); // Debugging for Safari

        if (!token) {
            console.warn('No token found in cookies');
            return next(errorHndler(401, 'Unauthorized: No token provided'));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('Token verification failed:', err.message);
                return next(errorHndler(403, 'Forbidden: Invalid token'));
            }

            req.user = user; // Attach user info to req for access in next middleware
            next();
        });
    } catch (error) {
        console.error('Unexpected error in verifyToken:', error.message);
        next(errorHndler(500, 'Internal Server Error'));
    }
};

