const validator = require("../validators/validator");
var database = require("../database/connection");
const userServices = require("../services/userBasicServices");
const responseHelper = require("../common/utils/responseHelper");
class userController {
    async register(req, res) {
        const connection = await database.connection();
        try {
            // Validate the request first...
            await validator.addUserValidator(req.body);
            //User Registeration Process
            var data = await userServices.registerService(connection, req.body);
            console.log(data);
            if (data.message) throw new Error(data.message);
            else return responseHelper.sendSuccessResponse(res, 200, 'User Registration Successfully done..', data);

        } catch (error) {
            return responseHelper.sendErrorResponse(res, 200, 'Error in registration process', data.message);
        }

    }

    async login(req, res) {
        const connection = await database.connection();
        try {
            console.log("Running");
            // Validate the request first...
            await validator.userLoginValidator(req.body);
            //User Registeration Process
            var data = await userServices.loginService(connection, req.body);
            if (data.message) throw new Error(data.message);
            else return responseHelper.sendSuccessResponse(res, 200, 'User Registration Successfully done..', data);

        } catch (error) {
            return responseHelper.sendErrorResponse(res, 200, 'Error in registration process', data);
        }

    }
}

module.exports = new userController();