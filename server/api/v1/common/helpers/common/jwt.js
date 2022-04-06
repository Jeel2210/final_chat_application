const jwt = require('jsonwebtoken');
const { encryptData, decryptData } = require('./crypto');

let secreteKey = "$2a$10$h5w/JG8p/CHVK2cZyiadbuQdSCrfhukuOU4C4hQuH36PI4FhzxotK";

const generateToken = async(data) => {

    var token = await jwt.sign(data, secreteKey, { expiresIn: '365d' })
    console.log("JWT", token);
    return token;
};

const verifyToken = async(token) => {
    console.log("Verifying token", token);
    let tokenVerify = await jwt.verify(token, secreteKey);
    console.log("Verified token", tokenVerify);
    return tokenVerify;
}

module.exports = { generateToken, verifyToken }