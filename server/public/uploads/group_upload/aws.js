/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const aws = require('aws-sdk');
const {
    S3: {
        accessKeyId,
        secretAccessKey,
        url,
        bucketName,
        region,
        apiVersion
    },
    QRCODE,
    BACKGROUNDS,
    FULL,
    SAGEMAKER_URL,
    CLEAN,
    STYLE
} = require('./../../configuration/configuration');
const AWSConfig = {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region
}
aws.config.update(AWSConfig);
const moment = require('moment');
const axios = require('axios');
const mysql = require('./../../connection/dbMaster');
const geoPattern = require('geopattern')
const s3 = new aws.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});
//upload image data AWS
exports.uploadDataURL = async (filename, filedata) => {
    try {
        let fileUpload = await s3.putObject({
            Bucket: bucketName,
            Key: QRCODE + '/' + filename,
            Body: filedata,
            ACL: 'public-read',
        }).promise();
        // console.log(fileUpload);
    } catch (err) {
        // console.log(err);
    }
};
//Delete image data AWS
exports.removeImageObject = async (filename) => {
    try {
        return new Promise((resolve, reject) => {
            s3.deleteObject({ Bucket: bucketName, Key: FULL + '/' + filename }, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    } catch (err) {
        // console.log(err);
    }
};
//Clean image using lambda API
exports.lambdaCleanImage = async (listingImageId, originalImageId, filename) => {
    try {
        let cleanImage = await new Promise((resolve, reject) => {
            s3.getObject({ Bucket: bucketName, Key: FULL + '/' + filename }, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    // console.log(data);
                    resolve(data);
                }
            });
        });
        let sageMakerPost = {
            Image_ID: filename,
            Image: cleanImage.Body.toString('base64')
        }
        let newCleanImage = await getCleanImage(sageMakerPost);
        // console.log('ImageConfidence', newCleanImage.Image_Confidence);
        let uploadCleanImage = await s3.putObject({
            Bucket: bucketName,
            Key: CLEAN + '/' + filename,
            Body: Buffer.from(newCleanImage.Image, 'base64'),
            ACL: 'public-read',
        }).promise();
        if (uploadCleanImage) {
            let updateCleanImageListingImage = {
                clean_image_id: originalImageId,
                confidence_index: newCleanImage.Image_Confidence,
                clean_image_active: 1,
                update_time: moment().format('YYYY-MM-DD hh:mm:ss')
            }
            await mysql.query("update listing_images SET ? where id=" + listingImageId, updateCleanImageListingImage);
        }
        // console.log(uploadCleanImage);
    } catch (err) {
        // console.log(err);
    }
};
let getCleanImage = async (sageMakerPost) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: SAGEMAKER_URL, data: sageMakerPost
        }).then(function (response) {
            // handle success
            //            // console.log(response.data);
            resolve(response.data);
        }).catch(function (error) {
            // handle error
            // console.log(error);
            reject(error);
        });
    }
    );
};

//copy main image to aws
exports.copyMainImage = async (oldName, newName) => {
    try {
        return new Promise((resolve, reject) => {
            s3.copyObject({
                Bucket: bucketName,
                CopySource: bucketName + '/' + FULL + '/' + oldName,
                Key: FULL + '/' + newName
            }, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    // console.log("===DATA===", data);
                    resolve(data)
                }
            })
        })
    } catch (err) {
        // console.log(err);
    }
};

//copy clean image
exports.copyCleanImage = async (oldName, newName) => {
    try {
        return new Promise((resolve, reject) => {
            s3.copyObject({
                Bucket: bucketName,
                CopySource: bucketName + '/' + CLEAN + '/' + oldName,
                Key: CLEAN + '/' + newName
            }, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    // console.log("===DATA===", data);
                    resolve(data)
                }
            })
        })
    } catch (err) {
        // console.log(err);
    }
};

// AWS Textract API
exports.AmazonTextract = async (path) => {
    return new Promise((resolve, reject) => {
        var textract = new aws.Textract();
        var params = {
            Document: {
                S3Object: {
                    Bucket: bucketName,
                    Name: `${path}`,
                    // Version: 'STRING_VALUE'
                }
            },
            FeatureTypes: [/* required */
                'FORMS'
            ]
        };
        textract.analyzeDocument(params, function (err, data) {
            if (err) {
                console.log(`textract.analyzeDocument Error:::: `, err, err.stack); // an error occurred
                reject(err);
            } else {
                // data = data.Blocks.filter(x => x.BlockType == 'LINE');
                // resolve(data);


                var searchKey = '';

                var array = data.Blocks
                for (let i = 0; i < array.length; i++) {
                    const element = array[i];
                    if (element.Text !== undefined) {
                        searchKey = searchKey + ' ' + element.Text;
                    }
                }
                console.log("search", searchKey);
                // data = data.Blocks.filter(x => x.BlockType == 'PAGE');
                // console.log("data: " + JSON.stringify(data));
                // var updatedPageSearchkey = data[0]
                // console.log("Updated search", updatedPageSearchkey);

                resolve(searchKey);
                
            }
        });
    })
};

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
var GeoPattern = require('geopattern');

exports.uploadBgImg = async () => {
    try {
        let randString = makeid(5);
        console.log(randString);
        var pattern = GeoPattern.generate(randString);
        console.log(pattern);
        let fileUpload = await s3.putObject({
            Bucket: bucketName,
            Key: BACKGROUNDS + '/' + makeid(5),
            Body: pattern.toDataUrl(),
            ACL: 'public-read',
        }).promise();
        console.log(fileUpload);
    } catch (err) {
        console.log(err);
    }
};


exports.copyStyleImage = async (name) => {
    try {
        console.log("STYLE  IMAGE NAME=========",name);
        return new Promise((resolve, reject) => {
            s3.copyObject({
                Bucket: bucketName,
                CopySource: bucketName + '/' + FULL + '/' + name,
                Key: STYLE + '/' + name
            }, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    // console.log("===DATA===", data);
                    resolve(data)
                }
            })
        })
    } catch (err) {
        console.log(err);
    }
};

