const {API_KEY,APP_ID,SECRET_KEY} = require("../config/config_default")

const AipFaceClient = require("baidu-aip-sdk").face;
const client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

//面部检测
const qualityControl = (result)=>{
    let width = result.location.width;
    let height = result.location.height;
    let yaw = result.angle.yaw;
    let pitch = result.angle.pitch;
    let roll = result.angle.roll;
    let occulusion = result.quality.occlusion;
    let blur = result.quality.blur;
    let illumination = result.quality.illumination;
    let completeness = result.quality.completeness;

    if( width < 80 && height < 80){
        let err = {
            meassage:"脸的范围太小了。"
        }
        throw err;
    }
    if( blur > 0.7){
        let err = {
            error_msg:"脸太模糊了。"
        }
        throw err;
    }
    if( illumination < 40){
        let err = {
            error_msg:"光线太暗了。"
        }
        throw err;
    }
    if( yaw < -20 || yaw > 20 || pitch < -20 || pitch > 20 || roll < -20 || roll > 20 ){
        let err = {
            error_msg:"头太歪了。"
        }
        throw err;
    };
    if (occulusion.left_eye > 0.6 || occulusion.right_eye > 0.6 || occulusion.nose > 0.7 || occulusion.mouth > 0.7 || occulusion.left_check > 0.8 || occulusion.right_check > 0.8 || occulusion.chin_contour > 0.6){
        let err = {
            error_msg:"面部遮挡太多了。"
        }
        throw err;
    }
    if (completeness < 0.5){
        let err = {
            error_msg:"人脸超出屏幕范围。"
        }
        throw err;
    }
    return true;
}

//注册人脸
exports.registerFace = async (studentImage,studentUserId) => {
    let image = studentImage;
    let imageType = "BASE64";
    let groupId = "students";
    let userId = studentUserId;
    try {
        let result = await client.addUser(image, imageType, groupId, userId)
        if(result.error_code){
            throw result;
        }
        // console.log(result);
        // res.status(201).json({
        //     result:true,
        //     message:"注册成功"
        // });
        return;
    } catch (err) {
        err.status = 400;
        err.baiduErrCode = err.error_code;
        err.message = err.error_msg;
        throw err;
    }
}


//匹配人脸
exports.matchFace = async (studentImage,studentUserId) => {
    let image = studentImage;
    let imageType = "BASE64";
    let groupId = "students";
    let userId = studentUserId;
    try {
        let faceToken = await client.faceGetlist(userId, groupId)
        let tokenImage = faceToken.result ? faceToken.result.face_list[0].face_token : 0
        let result = await client.match([{
            image: image,
            image_type: imageType
        }, {
            image: tokenImage,
            image_type: 'FACE_TOKEN'
        }])
        if(result.error_code){
            throw result;
        }
        // res.status(200).json({
        //     result:true,
        //     message:"匹配成功",
        //     score:result.result.score
        // });
        return result.result.score
    } catch (err) {
        err.status = 400;
        err.baiduErrCode = err.error_code;
        err.message = err.error_msg;
        throw err;
    }
};


//检测人脸
exports.cheackFace = async (studentImage)=>{
    try{
        let image = studentImage;
        console.log(image.slice(0,50))
        let imageType = "BASE64";
        let options = {};
        options["face_field"] = "quality";
        let result = await client.detect(
            image,
            imageType,
            options
            );
        if(result.error_code){
            throw result;
        }
        qualityControl(result.result.face_list[0]);
        // res.status(200).json({
        //     result:true,
        //     message:"识别成功"
        // });
        return;
    }catch(err){
        err.status = 400;
        err.baiduErrCode = err.error_code;
        err.message = err.error_msg;
        throw err;
    }
}

//删除人脸用户
exports.deleteFaceUser = async (studentUserId)=>{
    try{
        let groupId = "students";
        let userId = studentUserId;
        // 调用删除用户
        let result = await client.deleteUser(groupId, userId);
        if(result.error_code){
            throw result;
        }
        // res.status(200).json({
        //     result:"true",
        //     message:"删除成功",
        // })
        return;
    }catch(err){
        err.status = 400;
        err.baiduErrCode = err.error_code;
        err.message = err.error_msg;
        throw err;
    }
}

