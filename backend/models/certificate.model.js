const mongoose = require("mongoose");
const { Schema } = mongoose;

const certificateModel = {
    name: {
        type: String
    },
    url: {
        type: String
    },
    validityFromYear: {
        type: Number
    },
    validityFromMonth: {
        type: String
    },
    validityToYear: {
        type: Number
    },
    validityToMonth: {
        type: String
    },
    alwaysValid: {
        type: Boolean,
        default: false
    }
}

module.exports = mongoose.model("Certificate", certificateModel)