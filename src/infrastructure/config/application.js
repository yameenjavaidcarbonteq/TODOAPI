require('dotenv').config();
module.exports = {
    host: process.env.HOST,
    port: process.env.PORT,
    jwtsecret: process.env.JWTSECRET
}
