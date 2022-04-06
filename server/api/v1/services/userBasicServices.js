var databaseHelper = require('../common/helpers/databaseHelper');
// var emailService = require('../../helper/libraries/emailService');
const bcrypt = require("../common/helpers/common/bcrypt");
const { generateToken } = require('../common/helpers/common/jwt');

class userServices {

    async registerService(connection, body) {
        try {
            //current timestamps            
            let currentDate = new Date().getTime(); //13 Math.round(new Date().getTime() / 1000);
            let checkExisting = await databaseHelper.selectData(connection, 'users', '*', `email='${body.email}'`);
            if (checkExisting && checkExisting.length > 0) {
                throw new Error('User already registered');
            } else {
                console.log("body", body)
                var registerData = {
                    name: body.name,
                    username: body.username,
                    password: body.password,
                    email: body.email,
                };

                //resulted registerdData
                var registerdData = await databaseHelper.insertData(connection, 'users', registerData);
                console.log(registerdData)
                return registerdData;
            }


        } catch (error) {

            return error;
        }
    }
    async loginService(connection, body) {
        try {
            let checkExisting = await databaseHelper.selectData(connection, 'users', '*', `email='${body.email}'`);

            if (checkExisting && checkExisting.length > 0) {
                let password = await bcrypt.isPasswordMatched(body.password, checkExisting[0].password)
                if (password == false) {
                    throw new Error("Invalid password")
                } else {
                    console.log("id", checkExisting[0].id)
                    var token = await generateToken({ id: checkExisting[0].id })

                    let resData = {
                        id: checkExisting[0].id,
                        name: checkExisting[0].name,
                        email: checkExisting[0].email,
                        token: token,
                    }
                    return resData;
                }

            } else {
                throw new Error('Please register first');
            }


        } catch (error) {

            return error;
        }
    }
}
module.exports = new userServices();