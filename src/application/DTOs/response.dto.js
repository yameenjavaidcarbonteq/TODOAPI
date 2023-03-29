class ResponseDTO {
    constructor(status, data, message) {
        return {
            status: status,
            data: data,
            message: message
        }
    }
}


module.exports = ResponseDTO;