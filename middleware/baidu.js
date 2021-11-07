const { client }=require("../utils/baidu")

// exports.cheackFace = async (req,res,next)=>{
//     try{
//         let options = {};
//         options
//         let result = await client.detect(
//             req.body.image,
//             req.body.imageType
//             );
//         if(result.error_code){
//             throw result;
//         }
//         console.log(result.result.face_list);
//          next();
//     }catch(err){
//         err.status = 400;
//         err.baiduErrCode = err.error_code;
//         err.message = err.error_msg;
//         next(err);
//     }
// }