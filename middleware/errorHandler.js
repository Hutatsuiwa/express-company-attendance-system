module.exports = ()=>{
    return (err, req, res, next)=>{
        res.status(err.status || 500);
        console.log(err);
        res.json({
            baiduErrCode:err.baiduErrCode,
            result:false,
            message:err.message,
            validateErrors:err.errors
        });
    }
}