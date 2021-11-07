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

module.exports={client,qualityControl}