module.exports = {
    ...require ("./bootstrap/app"),
    ...require ("./controllers"),
    ...require ("./middlewares"),
    ...require ("./routes"),
    ...require ("./express"),
}