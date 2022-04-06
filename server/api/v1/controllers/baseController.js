const databaseHelper = require("../common/helpers/databaseHelper");
const database = require("../database/connection")
const bcryptHelper = require("../common/helpers/common/bcrypt");
const jwtHelper = require("../common/helpers/common/jwt");
const auth = require("../common/middleware/auth");
const { ioImageResponse, ioMessageResponse, ioResponseList, ioFileResponse, newMessage, ioHistoryResponse, ioImageHistory, ioFileHistory, groupRegistration, groupMessages, groupListResponse, messageGroupHistoryResponse, newGroup, groupFileUploadResponse, newGroupMessage } = require("../common/helpers/ioResponseHelper");
const { userRegistrationSocketResponse, userLoginSocketResponse } = require("../common/helpers/socketResponseHelper");
var path = require('path');
const { getUserSocket, getOnlineUserList } = require("../common/middleware/auth");

class BaseController {

    async sendMultipleImage(io, socket, req) {
        console.log("socket sent");

        await auth.customAuth(socket, req);
        const mysqlConnection = await database.connection();
        try {

            var fileArray = req.files
            for (let i = 0; i < fileArray.length; i++) {

                var files = fileArray[i].message.data

                var getSenderDetails = await databaseHelper.selectData(mysqlConnection, 'users', '*', `id=${fileArray[i].sender}`)
                var getReciverDetails = await databaseHelper.selectData(mysqlConnection, 'users', '*', `id=${fileArray[i].receiver}`)

                var socketData = auth.getUserSocket();

                var ioSender = fileArray[i].sender
                var data = {
                    filePath: files.path,
                    senderId: getSenderDetails[0].id,
                    senderName: getSenderDetails[0].name,
                    receiverId: getReciverDetails[0].id,
                    receiverName: getReciverDetails[0].name,
                    filename: files.file,

                }
                var userData = {
                    sender: getSenderDetails[0],
                    receiver: getReciverDetails[0]
                }
                console.log((files.file).toLowerCase());
                var ext = path.extname((files.file).toLowerCase())
                console.log("ext: " + ext);

                if (ext == '.jpg' || ext == '.jpeg' || ext == '.png' || ext == '.gif' || ext == '.svg') {
                    await ioImageResponse(io, socketData, ioSender, data)

                    if (socketData[fileArray[i].receiver]) {
                        var ioReciever = fileArray[i].receiver
                        console.log("ioReciever", ioReciever);

                        await newMessage(io, socketData, ioReciever, userData)

                        await ioImageResponse(io, socketData, ioReciever, data)
                    }

                } else {
                    await ioFileResponse(io, socketData, ioSender, data)

                    if (socketData[fileArray[i].receiver]) {
                        var ioReciever = fileArray[i].receiver
                        console.log("ioReciever", ioReciever);

                        await newMessage(io, socketData, ioReciever, userData)

                        await ioFileResponse(io, socketData, ioReciever, data)
                    }
                }
            }

        } catch (error) {

            socket.emit('response', { code: 0, methodName: 'chat' })

        }

    }

    async userList(io, socket, req) {
        const connection = await database.connection();
        try {

            let users = await databaseHelper.selectData(connection, 'users', 'id,name,email');

            socket.emit("list", {
                users: users,
            });

        } catch (error) {

            socket.emit("respose", {
                code: 0,
                message: 'error'
            });

        }
    }

    async login(io, socket, req) {

        const connection = await database.connection();

        try {

            let checkExisting = await databaseHelper.selectData(connection, 'users', '*', `email='${req.email}'`);

            if (checkExisting && checkExisting.length > 0) {

                let password = await bcryptHelper.isPasswordMatched(req.password, checkExisting[0].password)

                if (password == false) {
                    socket.emit('userLogin', { status: false, message: 'login failed due invalid credentials' })
                } else {

                    var token = await jwtHelper.generateToken({ id: checkExisting[0].id })
                    let resData = {
                        id: checkExisting[0].id,
                        name: checkExisting[0].name,
                        email: checkExisting[0].email,
                        token: token,
                    }

                    await userLoginSocketResponse(socket, true, 'Logged in successfully', resData)
                }
            } else {
                await userLoginSocketResponse(socket, false, "The email address you entered isn't connected to an account. ", '')
            }


        } catch (error) {
            console.log("error", error);
        }

    }

    async register(io, socket, req) {

        const connection = await database.connection();

        try {

            let checkExisting = await databaseHelper.selectData(connection, 'users', '*', `email='${req.email}'`);

            if (checkExisting && checkExisting.length > 0) {

                await userRegistrationSocketResponse(socket, false, 'Registration failed due to user already registered', '')


            } else {

                var registerData = {
                    name: req.name,
                    username: req.username,
                    password: req.password,
                    email: req.email,

                };
                var registerdData = await databaseHelper.insertData(connection, 'users', registerData);
                await userRegistrationSocketResponse(socket, true, 'Registration success', registerdData)

            }

        } catch (error) {
            console.log("error");
        }

    }

    async chat(io, socket, req) {

        await auth.customAuth(socket, req);

        try {
            const mysqlConnection = await database.connection();

            var getSenderDetails = await databaseHelper.selectData(mysqlConnection, 'users', '*', `id=${req.sender}`)
            var getReciverDetails = await databaseHelper.selectData(mysqlConnection, 'users', '*', `id=${req.receiver}`)

            var messageData = {
                sender_id: (req.sender),
                reciver_id: (req.receiver),
                message: req.message,
            };

            var messages = await databaseHelper.insertData(mysqlConnection, 'messages', messageData)

            req.senderDetails = getSenderDetails
            req.receiverDetails = getReciverDetails

            var socketData = auth.getUserSocket();
            var ioSender = req.sender
            var data = {
                message: req.message,
                senderId: getSenderDetails[0].id,
                senderName: getSenderDetails[0].name,
                receiverId: getReciverDetails[0].id,
                receiverName: getReciverDetails[0].name,

            }
            console.log("data: " + data);
            await ioMessageResponse(io, socketData, ioSender, data)

            if (socketData[req.receiver]) {

                var ioReciever = req.receiver
                var messageData = {
                    sender: getSenderDetails[0],
                    receiver: getReciverDetails[0]

                }
                console.log("data:", messageData);
                await newMessage(io, socketData, ioReciever, messageData)

                await ioMessageResponse(io, socketData, ioReciever, data)

            }

        } catch (error) {

            console.log("error", error);
            socket.emit("respose", {
                code: 0,
                message: 'error'

            });
        }
    }

    async messageHistory(io, socket, req) {

        await auth.customAuth(socket, req);

        const mysqlConnection = await database.connection();

        try {

            const messageHistory = await databaseHelper.selectData(mysqlConnection, 'messages', '*', `sender_id=${req.sender} and reciver_id=${req.receiver} or sender_id=${req.receiver} and reciver_id=${req.sender}`);
            const imageHistory = await databaseHelper.selectData(mysqlConnection, 'images', '*', `sender_id=${req.sender} and receiver_id =${req.receiver} or sender_id=${req.receiver} and receiver_id =${req.sender}`)
            for (let i = 0; i < messageHistory.length; i++) {

                var senderData = await databaseHelper.selectData(mysqlConnection, 'users', '*', `id = ${ messageHistory[i].sender_id }`)
                var receiverData = await databaseHelper.selectData(mysqlConnection, 'users', '*', `id = ${ messageHistory[i].reciver_id }`)

                var socketData = auth.getUserSocket();

                var ioSender = req.sender
                var data = {
                    message: messageHistory[i].message,
                    senderId: senderData[0].id,
                    senderName: senderData[0].name,
                    receiverId: receiverData[0].id,
                    receiverName: receiverData[0].name,
                    sent_at: messageHistory[i].sent_at
                }
                console.log("data: " + data);
                await ioHistoryResponse(io, socketData, ioSender, data)

            }
            for (let i = 0; i < imageHistory.length; i++) {
                console.log("receiverData", imageHistory[i].receiver_id);
                var senderData = await databaseHelper.selectData(mysqlConnection, 'users', '*', `id = ${imageHistory[i].sender_id}`)
                var receiverData = await databaseHelper.selectData(mysqlConnection, 'users', '*', `id = ${imageHistory[i].receiver_id}`)

                var socketData = auth.getUserSocket();

                var ioSender = req.sender
                var data = {
                    filePath: `http://192.168.1.164:8000/${imageHistory[i].filename}`,
                    senderId: senderData[0].id,
                    senderName: senderData[0].name,
                    receiverId: receiverData[0].id,
                    receiverName: receiverData[0].name,
                    filename: imageHistory[i].filename,
                    sent_at: imageHistory[i].created_at
                }
                console.log("data: " + data);
                var ext = path.extname(imageHistory[i].filename.toLowerCase())
                console.log("ext: " + ext);

                if (ext == '.jpg' || ext == '.jpeg' || ext == '.png' || ext == '.gif' || ext == '.svg') {
                    await ioImageHistory(io, socketData, ioSender, data)
                } else {
                    await ioFileHistory(io, socketData, ioSender, data)
                }
            }

        } catch (error) {

            console.log("error", error);
            socket.emit("respose", {
                code: 0,
                message: 'error'

            });
        }
    }

    async chatUserHistory(io, socket, req) {

        await auth.customAuth(socket, req);

        const connection = await database.connection();

        try {

            let users = await connection.query(`SELECT reciver_id,sender_id FROM messages WHERE sender_id=${req.sender} or reciver_id=${req.sender} GROUP BY reciver_id`);
            let userDetails = []

            for (let i = 0; i < users.length; i++) {
                var id = users[i].reciver_id
                var getReciverDetails = await connection.query(`SELECT id,name,email from users where id=${id}`);

                if (getReciverDetails[0].id == req.sender) {
                    var getReciverDetails = await connection.query(`SELECT id,name,email from users where id=${users[i].sender_id}`);
                    console.log("getReciverDetails", getReciverDetails[0].name);
                    userDetails.push(getReciverDetails[0]);
                } else {
                    userDetails.push(getReciverDetails[0]);

                }
            }
            console.log("UserDetails", userDetails);
            console.log("data:", getReciverDetails[0]);
            var socketData = auth.getUserSocket();
            var ioSender = req.sender
            var data = userDetails

            await ioResponseList(io, socketData, ioSender, data)
        } catch (error) {

            socket.emit("respose", {
                code: 0,
                message: 'error'

            });
        }
    }

    async joinNewGroup(io, socket, req) {
        await auth.customAuth(socket, req);
        console.log("users", req.users);
        const connection = await database.connection();
        try {
            console.log("requestedData:==", req);
            var groupData = {
                name: req.groupName,
            };

            var registerdData = await databaseHelper.insertData(connection, 'groups', groupData);

            var admin = {
                user_id: req.adminId,
                joined_at: req.joinedAt,
                group_id: registerdData,
                user_type: 'admin'
            };
            var adminReg = await databaseHelper.insertData(connection, 'group_users', admin);

            console.log("admin: " + admin, adminReg);

            var users = req.users;
            console.log("users: " + users);
            for (let i = 0; i < users.length; i++) {
                console.log("Users:: ", users[i])
                var user = {
                    user_id: users[i],
                    joined_at: req.joinedAt,
                    group_id: registerdData,
                    user_type: 'user'
                };
                var usersReg = await databaseHelper.insertData(connection, 'group_users', user);
                console.log("users: " + usersReg);

            }
            socket.join("room-" + registerdData);

            await auth.room(socket, registerdData)
            var socketData = auth.getUserSocket();

            var toGroup = registerdData
            req.groupId = registerdData
            await groupRegistration(io, socketData, toGroup, req)
            for (let i = 0; i < req.users.length; i++) {
                if (req.users[i] != req.adminId) {
                    if (socketData[req.users[i]]) {
                        await newGroup(io, socketData, req.users[i], req);
                    }
                }

            }




        } catch (error) {
            console.log("error", error);
        }

    }


    async groupMessages(io, socket, req) {
        console.log("data==============================================================================", req);
        await auth.customAuth(socket, req);

        const connection = await database.connection();
        try {
            console.log("Sender", req.sender.id);

            var message = {
                user_id: req.sender.id,
                message: req.message,
                group_id: req.groupId,
                sent_at: req.sentAt,
            };
            var groupMessage = await databaseHelper.insertData(connection, 'group_messages', message);
            console.log("Messages", groupMessage);
            var groupName = await databaseHelper.selectData(connection, 'groups', 'name', `id=${req.groupId}`)
            var groupUsers = await databaseHelper.selectData(connection, 'group_users', 'user_id', `group_id=${req.groupId} and user_id!=${req.sender.id}`)
            console.log("groupUsers", groupUsers);

            console.log("======Group Name", groupName[0].name);
            await auth.room(socket, req.groupId)
            var socketData = auth.getUserSocket();
            console.log(socketData);
            var toGroup = req.groupId
            req.groupMessageId = groupMessage
            delete req.header
            console.log("messages", groupMessage);
            await auth.room(socket, req.groupId);
            var socketData = auth.getUserSocket();
            await groupMessages(io, socketData, req.sender.id, req);
            for (let i = 0; i < groupUsers.length; i++) {
                console.log("id==================", groupUsers[i].user_id, req.sender.id);
                if (groupUsers[i].user_id !== req.sender.id) {
                    console.log("running", groupUsers[i].user_id);
                    if (socketData[groupUsers[i].user_id]) {
                        console.log("running", socketData[groupUsers[i].user_id]);
                        await newGroupMessage(io, socketData, groupUsers[i].user_id, message)
                        await groupMessages(io, socketData, groupUsers[i].user_id, req);

                    }
                }

            }


        } catch (error) {
            console.log("error", error);
        }

    }

    async groupList(io, socket, req) {
        await auth.customAuth(socket, req);

        const connection = await database.connection();

        try {
            console.log("groupList", req.userId);
            var groupUsers = await databaseHelper.selectData(connection, 'group_users gu inner join groups g ', 'group_id', `gu.user_id =${req.userId} group by group_id `)
            console.log("groupList", groupUsers);

            var socketData = auth.getUserSocket();
            console.log("socketData", socketData);
            var ioSender = req.userId
            var groupData = [];
            for (let i = 0; i < groupUsers.length; i++) {
                var groupId = groupUsers[i].group_id
                var group = await databaseHelper.selectData(connection, 'groups', 'name', `id=${groupUsers[i].group_id}`)
                var groupName = group[0].name
                groupData.push({ groupId, groupName })

            }
            await groupListResponse(io, socketData, ioSender, groupData)

        } catch (error) {
            console.log("error", error);

        }

    }

    async groupUsers(io, socket, req) {
        await auth.customAuth(socket, req);

        const connection = await database.connection();
        try {

            var groupUsers = await databaseHelper.selectData(connection, 'group_users gu', '*', `inner join groups g where gu.user_id =${req.userId} `)
            await groupUserResponse(io, socket, groupUsers)

        } catch (error) {

        }
    }

    async messageGroupHistory(io, socket, req) {
        console.log("MessageGroup history running....", req.sender, req.groupId);

        await auth.customAuth(socket, req);

        await auth.room(socket, req.groupId)

        var socketData = auth.getUserSocket();
        console.log("dsjadjsakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", socketData);
        const mysqlConnection = await database.connection();
        try {
            const messageHistory = await databaseHelper.selectData(mysqlConnection, 'group_messages', '*', `group_id =${req.groupId} `);
            const fileHistory = await databaseHelper.selectData(mysqlConnection, 'group_files', '*', `group_id =${req.groupId}`)
            for (let i = 0; i < messageHistory.length; i++) {
                var senderData = await databaseHelper.selectData(mysqlConnection, 'users', 'id,name,email', `id = ${ messageHistory[i].user_id  }`)

                var data = {
                    message: messageHistory[i].message,
                    sender: senderData[0],
                    receiver: req.groupId,
                    sent_at: messageHistory[i].sent_at,

                }
                data.type = 'chat'
                await messageGroupHistoryResponse(io, socketData, req.sender, data)
            }


            for (let i = 0; i < fileHistory.length; i++) {
                var senderData = await databaseHelper.selectData(mysqlConnection, 'users', 'id,name,email', `id = ${ fileHistory[i].user_id  }`)

                var data = {
                    message: `http://192.168.1.164:8000/group_upload/${fileHistory[i].filename}`,
                    sender: senderData[0],
                    receiver: req.groupId,
                    sent_at: fileHistory[i].sent_at,
                    filename: fileHistory[i].filename,
                }
                var ext = path.extname(fileHistory[i].filename.toLowerCase())
                if (ext == '.jpg' || ext == '.jpeg' || ext == '.png' || ext == '.gif' || ext == '.svg') {
                    data.type = 'image'
                    await messageGroupHistoryResponse(io, socketData, req.sender, data)
                } else {
                    data.type = 'file'
                    await messageGroupHistoryResponse(io, socketData, req.sender, data)
                }
            }


        } catch (error) {
            console.log("error", error);
            socket.emit("respose", {
                code: 0,
                message: 'error'

            });
        }
    }


    async groupFileUpload(io, socket, req) {
        await auth.customAuth(socket, req);
        const mysqlConnection = await database.connection();
        try {
            console.log("running groupFileUpload", req);

            var socketData = auth.getUserSocket();

            var fileArray = req.files
            for (let i = 0; i < fileArray.length; i++) {

                var files = fileArray[i].message.data

                var getSenderDetails = await databaseHelper.selectData(mysqlConnection, 'users', 'id,email,name', `id=${fileArray[i].sender}`)
                console.log("files", getSenderDetails);

                var getGroupDetails = await databaseHelper.selectData(mysqlConnection, 'groups', 'id,name', `id=${fileArray[i].group}`)
                console.log("group details", fileArray[i].group);
                var groupUsers = await databaseHelper.selectData(mysqlConnection, 'group_users', 'user_id', `group_id=${fileArray[i].group} and user_id!=${fileArray[i].sender}`)
                console.log("groupUsers", groupUsers);

                await auth.room(socket, fileArray[i].group);
                var socketData = auth.getUserSocket();
                console.log(socketData);
                var ioSender = fileArray[i].sender
                console.log("ioSender", ioSender);
                var data = {
                    path: files.path,
                    sender: {
                        id: getSenderDetails[0].id,
                        name: getSenderDetails[0].name,

                    },
                    groupId: getGroupDetails[0].id,
                    groupName: getGroupDetails[0].name,
                    message: files.path,
                    filename: files.file


                }

                var fileData = {
                    group_id: getGroupDetails[0].id,
                    message: files.path,
                    user_id: getSenderDetails[0].id,


                }
                console.log("data: " + JSON.stringify(data));
                var ext = path.extname(files.file.toLowerCase())
                console.log("ext: " + ext);

                if (ext == '.jpg' || ext == '.jpeg' || ext == '.png' || ext == '.gif' || ext == '.svg') {
                    console.log(socketData[ioSender]);
                    //                    {type: 'chat', message: 'bnbn', sender: {…}, sent_at: '2021-10-26T00:25:09.000Z'}
                    data.type = 'image'
                    await groupFileUploadResponse(io, socketData, ioSender, data)
                    for (let i = 0; i < groupUsers.length; i++) {
                        console.log("id==================", groupUsers[i].user_id);

                        if (groupUsers[i].user_id != ioSender) {
                            if (socketData[groupUsers[i].user_id]) {
                                await newGroupMessage(io, socketData, groupUsers[i].user_id, fileData)

                                await groupFileUploadResponse(io, socketData, groupUsers[i].user_id, data)


                            }
                        }

                    }

                } else {
                    data.type = 'file'
                    await groupFileUploadResponse(io, socketData, ioSender, data)
                    for (let i = 0; i < groupUsers.length; i++) {
                        console.log("id==================", groupUsers[i].user_id);

                        if (groupUsers[i].user_id != ioSender) {
                            if (socketData[groupUsers[i].user_id]) {
                                //fileData                              
                                await newGroupMessage(io, socketData, groupUsers[i].user_id, fileData)

                                await groupFileUploadResponse(io, socketData, groupUsers[i].user_id, data)
                            }
                        }

                    }
                    //         if (socketData[fileArray[i].receiver]) {
                    //             var ioReciever = fileArray[i].receiver
                    //             console.log("ioReciever", ioReciever);
                    //             await ioFileResponse(io, socketData, ioReciever, data)
                }
                //         }
            }

        } catch (error) {

            socket.emit('response', { code: 0, methodName: 'chat' })

        }

    }


}
module.exports = new BaseController();