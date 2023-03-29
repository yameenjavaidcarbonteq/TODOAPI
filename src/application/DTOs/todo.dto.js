class UserDto {
    constructor(data) {
        return {
            id: data.id,
            userId: data.userId,
            title: data.email,
            description: data.description,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        }
    }
}


module.exports = UserDto;