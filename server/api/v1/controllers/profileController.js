let database = require('../database/connection');
var databaseHelper = require('../common/helpers/databaseHelper');
const responseHelper = require('../common/utils/responseHelper');

class userProfileController {

    async userList(req, res) {
        const connection = await database.connection();
        try {

            //rendering List Element
            let users = await databaseHelper.selectData(connection, 'users', 'id,name,email');
            // console.log("List", users);
            return responseHelper.sendSuccessResponse(res, 200, 'userList', users);

        } catch (error) {
            return responseHelper.sendErrorResponse(res, 200, 'Error in userList', '');
        }
    }



}




module.exports = new userProfileController();