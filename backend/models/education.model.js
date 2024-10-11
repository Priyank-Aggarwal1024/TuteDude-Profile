const mongoose = require("mongoose");
const { Schema } = mongoose;
const educationModel = Schema({
    profession: {
        type: String,
    },
    institutionName: {
        type: String
    },
    degree: {
        type: String
    },
    year: {
        type: Number
    },
    currentJobtitle: {
        type: String
    }
})
module.exports = mongoose.model("Education", educationModel);