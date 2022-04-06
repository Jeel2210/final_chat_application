const crypto = require('crypto');

const key = "ec8737f118f94aad1ee03e66d8711f71";
const iv = "228c1b3cce48a9cb";
const algorithm = 'aes-256-cbc';

const encryptData = (async(data) => {
    const cipherIV = await crypto.createCipheriv(algorithm, key, iv);


    let encrypted = cipherIV.update(JSON.stringify(data), 'utf-8', 'base64');
    encrypted += cipherIV.final('base64');
    console.log('encrypted data...', encrypted);
    return encrypted;
})

const decryptData = (async(data) => {
    console.log("data", typeof data);

    const decipherIV = crypto.createDecipheriv(algorithm, key, iv)
    console.log(decipherIV)

    let decrypted = decipherIV.update(data, 'base64', 'utf-8');

    console.log('decrypted data 23...', decrypted);

    decrypted += decipherIV.final('utf-8');
    console.log('decrypted data final...', decrypted);


    return decrypted;
})

module.exports = { encryptData, decryptData }