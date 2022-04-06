const { selectData } = require("./databaseHelper");

class ChatHelper {

    async getUserList(mysqlConnection) {
        var userList = await selectData(mysqlConnection, `users`);
        return userList;

    }

    async roomExists(mysqlConnection, room) {
        var isRoomExist = await selectData(mysqlConnection, 'rooms', '*', `name='${room}'`);
        var roomId;
        if (!isRoomExist[0] == '') {
            roomId = isRoomExist[0].id;
        } else {
            const insertedRoomId = await insertData(mysqlConnection, 'users', {
                room
            });
            roomId = insertedRoomId.insertId;
        }
        return roomId;
    }

    async getGroupMessages(mysqlConnection, room) {
        var roomId = await selectData(mysqlConnection, 'rooms', 'id', `name='${room}'`);
        var groupMessages = await selectData(mysqlConnection, 'group_messages g  INNER JOIN users u on g.user_id=u.id', 'g.message,g.created_at,u.username', `u.room_id=${roomId[0].id}`);
        return groupMessages;
    }


    async checkUserExistance(mysqlConnection, username, roomId) {
        var isUsernameExist = await selectData(mysqlConnection, 'users', '*', `username='${username}'`)
        return isUsernameExist[0];
    }

    async getRoomId(mysqlConnection, room) {
        return await selectData(mysqlConnection, 'rooms', 'id', `name='${room}'`);
    }

    async newUserData(mysqlConnection, username, room) {
        var roomId = await selectData(mysqlConnection, 'rooms', 'id', `name='${room}'`);
        const user = await insertData(mysqlConnection, 'users', {
            username,
            room_id: roomId[0].id,
            joined_at: new Date().toISOString(),
            created_at: new Date().toISOString()
        });
        return user;
    }

}


module.exports = new ChatHelper();