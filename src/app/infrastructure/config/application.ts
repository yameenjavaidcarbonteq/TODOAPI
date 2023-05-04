require('dotenv').config();
export const application = {
    host: process.env.HOST,
    port: process.env.PORT,
    jwtsecret: process.env.JWTSECRET || "",
    jwtexpirationtime: process.env.JWTEXPIRATIONTIME || "10m"
}