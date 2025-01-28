import { errorHndler }  from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

const token = req.cookies.access_token;

if(!token){
    return next(errorHndler(401, 'Unauthorized'));
}

jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err){
        return next(errorHndler(401, 'forbidden'));
    }

    req.user = user;
    next();
});

}
