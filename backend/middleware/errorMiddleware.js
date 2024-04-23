// UnSupported 

const notFound = (req, res, next) =>{
    const error = new Error(`Not found - ${req.orginalUrl}`)
    res.status(404);
    next(error);
}

// MiddleWare to handle Erros

const errorHandler = (error, req, res, next) =>{
    if(res.headerSent){
        return next(error);
    }

    res.status(error.code || 500).json({message: error.message || "An unknow error occhured"})
}

module.exports ={
    notFound,
    errorHandler
}