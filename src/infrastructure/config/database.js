require('dotenv').config();
module.exports = {
    dbtype: process.env.DBTYPE,
    db: process.env.DB_NAME,

    host: process.env.DB_HOST,
    port: process.env.MYSQLDB_DOCKER_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    
    uri: process.env.MONGO_URI,
    
};
