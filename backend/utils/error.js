export const errorHndler = (statusCode, message) => {
    const error = new Error(message || 'Something went wrong');
    error.statusCode = statusCode || 500;
    return error;
};
