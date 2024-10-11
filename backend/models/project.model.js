const mongoose = require("mongoose");
const { Schema } = mongoose;
const projectModel = Schema({
    title: {
        type: String,
        required: [true, "Project title is required."]
    },
    projectTag: {
        type: String,
        enum: ["employment", "education"],
        default: "education"
    },
    deliveredTo: {
        type: String
    },
    status: {
        type: String,
        enum: ["finish", "progress"],
        default: "finish"
    },
    projectDetails: {
        type: String
    },
    workedFromYear: {
        type: Number
    },
    workedFromMonth: {
        type: String
    },
    workedToYear: {
        type: Number
    },
    workedToMonth: {
        type: String
    },


})
module.exports = mongoose.model("Project", projectModel);
