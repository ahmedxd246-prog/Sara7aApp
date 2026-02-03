const errorHandler = async(err,req,res,next)=>{
    err.statusCode = err.status || 500;
    err.status = err.status || 'error';

    const response = {
        status,
        message: err.isOperational ? err.message : 'something went wrong',
    }
    if(process.env.NODE_ENV === 'development'){
        response.stack = err.stack;
        response.error = err;
    }
    res.status(err.statusCode).json(response);
}

export default errorHandler