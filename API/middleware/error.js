const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode||500).json({
        success: false,
        msg: err.message ||'Undefine Error'
    });
};


module.exports = errorHandler;