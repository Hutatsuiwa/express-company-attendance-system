const {API_KEY,APP_ID,SECRET_KEY} = require("../config/config_default")

const AipFaceClient = require("baidu-aip-sdk").face;
const client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

module.exports={client}