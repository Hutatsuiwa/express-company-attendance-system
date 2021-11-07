module.exports = async (req, res, next)=>{
    try{
        req.body.image = req.body.image.replace(/\s/g, "+").replace(/^data:image\/\w+;base64,/, '');
        next();
    }catch(err){
        next(err);
    }
}