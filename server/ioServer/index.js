const { selectData } = require('../api/v1/common/helpers/databaseHelper');
const { getUserSocket, getOnlineUserList } = require('../api/v1/common/middleware/auth');
const { onlineUserList } = require('../api/v1/controllers/baseController');
const baseController = require('../api/v1/controllers/baseController');;

module.exports = function(io) {
    io.on('connection', async(client) => {
        //     //user registration
        client.on('register', (req) => baseController.register(io, client, req));
        //user login
        client.on('login', (req) => baseController.login(io, client, req));
        //chat controller
        var userList = await getOnlineUserList()
        client.emit("onlineUserList", {
            users: userList,
        });
        client.on('chat', (req) => baseController.chat(io, client, req));
        //Show messageHistory
        client.on('messageHistory', (req) => baseController.messageHistory(io, client, req));
        //Show Chat History
        client.on('chatUserHistory', (req) => baseController.chatUserHistory(io, client, req));
        //Image Response
        client.on('imageResponse', (req) => baseController.sendMultipleImage(io, client, req));
        //Show User List
        client.on('userList', (req) => baseController.userList(io, client, req));
        //Show Chat History
        client.on('chatUserHistory', (req) => baseController.chatUserHistory(io, client, req));
        client.on('createGroup', (req) => baseController.joinNewGroup(io, client, req))
            //groupList
        client.on('groupList', (req) => baseController.groupList(io, client, req));
        //messageGroupHistory
        client.on('messageGroupHistory', (req) => baseController.messageGroupHistory(io, client, req))

        client.on('groupMessages', (req) => baseController.groupMessages(io, client, req))

        client.on('groupFileUpload', (req) => baseController.groupFileUpload(io, client, req))

        // Client Disconnect
        client.on('disconnect', () => { console.log('Client Disconnect') });

    });



};