// create your User model here
const { db, DataTypes } = require("../db/config");

const User = db.define("User", {
    username: DataTypes.STRING,
}) 



module.exports = User;
