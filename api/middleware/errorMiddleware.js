import logger from "../utils/logger.js";

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.method} ${req.originalUrl}`);
    res.status(404);
    logger.warn('[Not Found]', error)
    next(error);
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    logger.error(`[Error] Status Code: ${statusCode} -- Message: ${err.message}`)
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.MODE === 'prod' ? null: err.stack
    });
}

export { notFound, errorHandler }