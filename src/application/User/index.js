module.exports = {
    ...require('./handler'),
    ...require('./userCommands/createUserCommand'),
    ...require('./userCommands/updateUserCommand'),
    ...require('./userCommands/deleteUserCommand'),
    ...require('./userCommands/getAllUsersCommand'),
    ...require('./userCommands/getUserByIdCommand'),
    ...require('./userCommands/getUserByEmailCommand'),
}