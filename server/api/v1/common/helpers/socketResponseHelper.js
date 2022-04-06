class SocketResponseHelper {
    async userRegistrationSocketResponse(socket, status, message, data) {
        socket.emit('userRegistration', { status: status, message: message, data: data })
    }
    async userLoginSocketResponse(socket, status, message, data) {
        socket.emit('userLogin', { status, message, data })
    }

}

module.exports = new SocketResponseHelper()