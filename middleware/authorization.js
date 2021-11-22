const jwt = require("../utils/jwt")
const { jwtSecret } = require("../config/config_default")

module.exports = async (req,res,next)=>{
    try{
        let token = req.headers.authorization;
        token = token 
        ? token.split("Bearer ")[1]
        : null

        if(!token){
            let err = {};
            throw err;
        }   

        let decodeToken = await jwt.verify(token, jwtSecret);
        console.log(decodeToken)
        req.userName = decodeToken.username
        next()
    }catch(err){
        err.status = 401;
        err.message = "token验证失败";
        next(err)
    }
}