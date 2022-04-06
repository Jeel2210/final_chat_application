const express = require("express");
const profileController = require("../api/v1/controllers/profileController");
const userController = require("../api/v1/controllers/userController");
const router = express.Router();




router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/', profileController.userList)

module.exports = router;