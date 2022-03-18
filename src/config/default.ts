export default {
    port: process.env.PORT || 4000,
    dbName: process.env.dbName || "e_commerce_db",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET"
}