class ResponseHelper {
    async sendSuccessResponse(res, code, message, data) {

        res.send({
            code: code,
            message: message,
            data: data || null,
            status: true,
        });
    }


    async sendErrorResponse(res, code, message, data) {

        res.send({
            code: code,
            message: message,
            data: data || null,
            status: false,
        })
    }
}

module.exports = new ResponseHelper();