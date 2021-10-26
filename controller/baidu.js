const { client } = require("../utils/baidu")

exports.registerFace = async (req, res, next) => {
    let image = req.body.image.replace(/\s/g, "+").replace(/^data:image\/\w+;base64,/, '');
    let imageType = req.body.imageType;
    let groupId = req.body.groupId;
    let userId = req.body.userId;
    try {
        let result = await client.addUser(image, imageType, groupId, userId)
        if(result.error_code){
            throw result
        }
        console.log(result);
        res.status(201).json(result)
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}

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
        console.log('<match>: ' + JSON.stringify(result));
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
};
