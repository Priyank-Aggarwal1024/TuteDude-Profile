const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
const dbConnection = async () => {
    mongoose.connect(MONGO_URI).then(data => {
        console.log("Database connected successfully!");
    }).catch(err => {
        console.log("Database connection failed", err);
    })
}
module.exports = dbConnection