//just some middleware
const express = require("express");
const router = express.Router();
var multer = require('multer');
const sharp = require('sharp')
var path = require('path');
var database = require("../api/v1/database/connection");
const { insertData } = require("../api/v1/common/helpers/databaseHelper");

//basic express shit
router.get("/", (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
});



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({

    storage: storage
})

const groupStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/group_upload');
    },

    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var groupUpload = multer({

    storage: groupStorage
})


router.post('/multiple-file', upload.array('files'), async(req, res) => {
    const mysqlConnection = await database.connection();
    try {

        var imageArray = req.files
        var imageBuffer = []


        for (let i = 0; i < imageArray.length; i++) {
            var file = imageArray[i].originalname
            var imageData = {
                filename: file,
                sender_id: req.body.sender,
                receiver_id: req.body.receiver,
            }

            var images = await insertData(mysqlConnection, 'images', imageData)

            var path = `http://192.168.1.164:8000/${file}`


            var currentDate = new Date(Date.now()).toISOString()
            var data = {
                file,
                path,
                image_id: images,
                currentDate: currentDate,
            }
            imageBuffer.push({ sender: req.body.sender, receiver: req.body.receiver, message: { type: 'image', data: data } })

        }
        console.log("image buffer", imageBuffer)

        res.status(201).json({ data: imageBuffer })
    } catch (error) {
        res.send(error)
    }
})



router.post('/multiple-group-file', groupUpload.array('files'), async(req, res) => {
    const mysqlConnection = await database.connection();
    try {
        console.log("=============================================================================Running File Upload");
        console.log("req.files", req.body);
        var currentDate = new Date(Date.now()).toISOString()

        var imageArray = req.files
        var imageBuffer = []


        for (let i = 0; i < imageArray.length; i++) {
            console.log("image: " + imageArray[i]);
            var file = imageArray[i].originalname
            var fileData = {
                filename: file,
                user_id: req.body.sender,
                group_id: req.body.groupId,
                sent_at: currentDate
            }
            console.log("fileData", fileData);

            var files = await insertData(mysqlConnection, 'group_files', fileData)
            console.log("files", files);
            //5650517.jpg
            var path = `http://192.168.1.164:8000/group_upload/${file}`
            console.log("path", path);


            var data = {
                file,
                path,
                file_id: files,
                currentDate: currentDate,
            }
            imageBuffer.push({ sender: req.body.sender, group: req.body.groupId, message: { type: req.body.type, data: data } })

        }
        console.log("image buffer", imageBuffer)

        res.status(201).json({ data: imageBuffer })
    } catch (error) {
        res.send(error)
    }
})





module.exports = router;