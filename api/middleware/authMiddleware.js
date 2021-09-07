import jwt from 'jsonwebtoken';
import User from '../models/users.models.js';
import asyncHandler from 'express-async-handler';
import logger from '../utils/logger.js'

const protect = asyncHandler( async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.decode(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            logger.info(`[Auth protect] User: ${req.user.email} -- ${req.method} ${req.originalUrl}`)
            next();
        }catch(error){
            logger.error('[Auth protect] Not Authorized, token failed')
            res.status(401);
            throw new Error('Not Authorized, token failed');
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not Authorized, no token')
    }
});

export { protect };