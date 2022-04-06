class IoResponseHelper {

    async ioImageResponse(io, socketData, toPerson, data) {
        console.log("===============================================Running ioImageResponse", data);
        io.to(socketData[toPerson]).emit("message", {
            type: 'image',
            message: data.filePath,
            sender: {
                id: data.senderId,
                name: data.senderName
            },
            receiver: {
                id: data.receiverId,
                name: data.receiverName
            },
            filename: data.filename,
            sent_at: data.sent_at
        });

    }

    async ioImageHistory(io, socketData, toPerson, data) {
        console.log("===============================================Running ioImageHistory", data.sent_at);
        io.to(socketData[toPerson]).emit("messsageHistory", {
            type: 'image',
            message: data.filePath,
            sender: {
                id: data.senderId,
                name: data.senderName
            },
            receiver: {
                id: data.receiverId,
                name: data.receiverName
            },
            filename: data.filename,
            sent_at: data.sent_at
        });

    }

    async ioFileResponse(io, socketData, toPerson, data) {
        console.log("===============================================Running ioFileResponse", data.sent_at);
        io.to(socketData[toPerson]).emit("message", {
            type: 'file',
            message: data.filePath,
            sender: {
                id: data.senderId,
                name: data.senderName
            },
            receiver: {
                id: data.receiverId,
                name: data.receiverName
            },
            filename: data.filename,
            sent_at: data.sent_at
        });

    }

    async ioFileHistory(io, socketData, toPerson, data) {
        console.log("===============================================Running ioFileHistory ", data.sent_at);
        io.to(socketData[toPerson]).emit("messsageHistory", {
            type: 'file',
            message: data.filePath,
            sender: {
                id: data.senderId,
                name: data.senderName
            },
            receiver: {
                id: data.receiverId,
                name: data.receiverName
            },
            filename: data.filename,
            sent_at: data.sent_at
        });

    }
    async ioMessageResponse(io, socketData, toPerson, data) {
        console.log("===============================================Running ioMessageResponse", toPerson);
        io.to(socketData[toPerson]).emit("message", {
            type: 'chat',
            message: data.message,
            sender: {
                id: data.senderId,
                name: data.senderName
            },
            receiver: {
                id: data.receiverId,
                name: data.receiverName
            },
            sent_at: data.sent_at
        });

    }


    async ioHistoryResponse(io, socketData, toPerson, data) {
        console.log("===============================================Running ioHistoryResponse", toPerson);
        io.to(socketData[toPerson]).emit("messsageHistory", {
            type: 'chat',
            message: data.message,
            sender: {
                id: data.senderId,
                name: data.senderName
            },
            receiver: {
                id: data.receiverId,
                name: data.receiverName
            },
            sent_at: data.sent_at
        });

    }

    async ioResponseList(io, socketData, toPerson, data) {
        console.log("===============================================Running ioResponseList");
        io.to(socketData[toPerson]).emit("resList", {
            users: data,
        });
    }


    async newMessage(io, socketData, toPerson, data) {
        console.log("====================================Running New Message", data);
        io.to(socketData[toPerson]).emit('newMessage', data)
    }

    async groupRegistration(io, socketData, toGroup, data) {
            console.log("group registration==============================================", data, toGroup);
            io.to(socketData[`room-${toGroup}`]).emit('createGroupResponse', data);
        }
        //newGroup
    async newGroup(io, socketData, toPerson, data) {
        console.log("newGroup==============================================", data, toPerson);
        io.to(socketData[toPerson]).emit('newGroup', data);
    }


    async groupMessages(io, socketData, toPerson, data) {
        console.log("groupMessagesResponse==============================================", data, toPerson);
        io.to(socketData[toPerson]).emit('groupMessagesResponse', data);
    }
    async messageGroupHistoryResponse(io, socketData, toPerson, data) {

        console.log("messageGroupHistoryResponse==============================================", data, toPerson);

        io.to(socketData[toPerson]).emit("messageGroupHistoryResponse", {
            type: data.type,
            message: data.message,
            sender: data.sender,
            receiver: data.groupId,
            sent_at: data.sent_at || '',
            filename: data.filename,
        });

    }
    async groupListResponse(io, socketData, toPerson, data) {
        console.log("=========================================Running groupListResponse", data);
        io.to(socketData[toPerson]).emit('groupListResponse', data);
    }

    async groupFileUploadResponse(io, socketData, toPerson, data) {
        console.log("===============================================Running groupFileUploadResponse", data, socketData[toPerson]);
        io.to(socketData[toPerson]).emit('groupMessagesResponse', data);

        // io.to(socketData[to]).emit("message", {
        //     type: 'image',
        //     message: data.filePath,
        //     sender: {
        //         id: data.senderId,
        //         name: data.senderName
        //     },
        //     receiver: { id: data.groupId, name: data.groupName },
        //     filename: data.filename,
        // });

    }

    async newGroupMessage(io, socketData, toPerson, data) {
        console.log("====================================Running New GroupMessage", data, toPerson);
        io.to(socketData[toPerson]).emit('newGroupMessage', data)
    }

}

module.exports = new IoResponseHelper()