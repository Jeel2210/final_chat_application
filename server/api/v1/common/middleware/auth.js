const {
    verifyToken
} = require("../helpers/common/jwt");
const database = require("../../database/connection");
const { selectData } = require("../helpers/databaseHelper");

var userSockets = []; //Used to store all connected users data.
var groupSockets = []; //Used to store all groupSockets


class authHelper {
    customAuth = async(socket, req) => {
        try {

            console.log("Headers", req.header.auth_token);
            const token = req.header.auth_token
            const verify = await verifyToken(token);

            var id = verify.id;
            console.log("id=======================", id);
            req.token = token
            req.user_id = id;

            userSockets[id] = socket.id; // 14 must be dynamic from auth token

            console.log("Authorization Done.")
            console.log("userSockets Done.", userSockets)
            return true;


        } catch (e) {
            return false;
        }

    }

    room = async(socket, id) => {
        try {
            console.log(id);
            userSockets["room-" + id] = socket.id; // 14 must be dynamic from auth token
            console.log("Authorization Done.")
            console.log("userSockets Done.", userSockets)
            return true;


        } catch (e) {
            return false;
        }

    }


    async getOnlineUserList() {
        const connection = await database.connection();
        try {
            var onlineUserList = [];
            let users = await selectData(connection, 'users', 'id,email,name');
            for (let i = 0; i < users.length; i++) {
                var user = users[i].id;
                if (userSockets[user]) {
                    onlineUserList.push(users[i])
                }
            }
            console.log("user list================================================", onlineUserList);
            return onlineUserList;

        } catch (error) {

        }
    }


    getUserSocket() {
        console.log("userSocketsfdsfhsjfhsjjjjjjjjjjjjjjjjjjjjh.", userSockets);
        return userSockets;
    }

}

module.exports = new authHelper();