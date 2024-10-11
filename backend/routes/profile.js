const express = require("express");
const profileRouter = express.Router();
const { createUserProfile, updateUserProfile, getUserProfile } = require("../controllers/profile")
profileRouter.post("/create-profile", createUserProfile)
    .post("/update-profile", updateUserProfile)
    .get("/profile/:email", getUserProfile)


module.exports = profileRouter