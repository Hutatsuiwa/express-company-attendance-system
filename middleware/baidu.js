const { client }=require("../utils/baidu")

exports.cheackFace = async (req,res,next)=>{
    try{
        let result = await client.detect(
            req.body.image.replace(/\s/g, "+").replace(/^data:image\/\w+;base64,/, ''),
            req.body.imageType
            );
        if(result.error_code){
            throw result;
        }
        console.log(JSON.stringify(result));
         next();
    }catch(err){
        console.log(JSON.stringify(err));
        res.status(400).json(err)
    }
}