module.exports = async (req, res, next)=>{
    try{
        if(req.body.student){
            req.body.student.imageBase64 = req.body.student.imageBase64.replace(/\s/g, "+").replace(/^data:image\/\w+;base64,/, '');
        }
        if(req.body.login){
            req.body.login.imageBase64 = req.body.login.imageBase64.replace(/\s/g, "+").replace(/^data:image\/\w+;base64,/, '');
        }
        next();
    }catch(err){
        next(err);
    }
}