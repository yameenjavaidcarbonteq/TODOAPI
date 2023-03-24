module.exports = {
    ...require('./createUserCommand'),
    ...require('./updateUserCommand'),
    ...require('./deleteUserCommand'),
    ...require('./getAllUsersCommand'),
    ...require('./getUserByIdCommand'),
    ...require('./getUserByEmailCommand'),
}