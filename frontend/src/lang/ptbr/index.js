export default {
    ...require("./home").default,
    ...require("./errors").default,
    ...require("./lang").default,
    ...require("./auth").default,
    ...require("./global").default,
    ...require("./dashboard").default,
    ...require("./account").default,
}