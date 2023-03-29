class UserDto {
    constructor(data) {
        return {
            id: data.id,
            username: data.username,
            email: data.email,
            password: data?.password,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        }
    }
}


module.exports = TodoDto;