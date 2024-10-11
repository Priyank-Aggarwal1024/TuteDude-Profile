const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    state: {
        type: String
    },
    skills: [
        {
            type: String
        }
    ],
    education: {
        type: Schema.Types.ObjectId,
        ref: "Education"
    },
    resume: {
        type: String
    },
    portfolio: {
        type: String
    },
    bio: {
        type: String
    },
    preferredJobType: {
        type: String
    },
    preferredWorkMode: {
        type: String
    },
    linkedin: {
        type: String
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }],
    certificates: [
        {
            type: Schema.Types.ObjectId,
            ref: "Certificate"
        }
    ],
    languages: [
        {
            language: {
                type: String
            },
            proficiency: {
                type: String,
                enum: ["beginner", "intermediate", "expert"]
            }
        }
    ]


})

module.exports = mongoose.model("User", userModel);