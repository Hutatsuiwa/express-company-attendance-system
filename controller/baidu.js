const { client,qualityControl } = require("../utils/baidu")


//注册人脸
exports.registerFace = async (req, res, next) => {
    let image = req.body.image;
    let imageType = req.body.imageType;
    let groupId = req.body.groupId;
    let userId = req.body.userId;
    try {
        let result = await client.addUser(image, imageType, groupId, userId)
        if(result.error_code){
            throw result;
        }
        // console.log(result);
        res.status(201).json({
            result:true,
            message:"注册成功"
        });
    } catch (err) {
        err.status = 400;
        err.baiduErrCode = err.error_code;
        err.message = err.error_msg;
        next(err);
    }
}


//匹配人脸
exports.matchFace = async (req, res, next) => {
    let image = req.body.image.replace(/\s/g, "+").replace(/^data:image\/\w+;base64,/, '');
    let imageType = req.body.imageType;
    let groupId = req.body.groupId;
    let userId = req.body.userId;
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
        res.status(200).json({
            result:true,
            message:"匹配成功",
            score:result.result.score
        });
    } catch (err) {
        err.status = 400;
        err.baiduErrCode = err.error_code;
        err.message = err.error_msg;
        next(err);
    }
};


//检测人脸
exports.cheackFace = async (req,res,next)=>{
    try{
        let options = {};
        options["face_field"] = "quality";
        let result = await client.detect(
            req.body.image,
            req.body.imageType,
            options
            );
        if(result.error_code){
            throw result;
        }
        qualityControl(result.result.face_list[0]);
        res.status(200).json({
            result:true,
            message:"识别成功"
        });
    }catch(err){
        err.status = 400;
        err.baiduErrCode = err.error_code;
        err.message = err.error_msg;
        next(err);
    }
}

//删除人脸用户
exports.deleteFaceUser = async (req,res,next)=>{
    try{
        console.log(req.body);
        let groupId = req.params.groupId;
        let userId = req.params.userId;
        // 调用删除用户
        let result = await client.deleteUser(groupId, userId);
        if(result.error_code){
            throw result;
        }
        res.status(200).json({
            result:"true",
            message:"删除成功",
        })
    }catch(err){
        err.status = 400;
        err.baiduErrCode = err.error_code;
        err.message = err.error_msg;
        next(err);
    }
}

