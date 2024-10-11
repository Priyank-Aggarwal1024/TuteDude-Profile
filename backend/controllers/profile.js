const { createProfile, getProfile, editProfile } = require("../services/profile");

exports.getUserProfile = async (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(401).json({
            error: true,
            message: "Invalid Credentials"
        })
    }
    try {
        const result = await getProfile(email);
        const { status, ...rest } = result;
        if (status) {
            return res.status(status).json(rest)
        }
        return res.json(rest);
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

exports.createUserProfile = async (req, res) => {
    const { profile } = req.body;
    const { email } = profile;
    if (!profile) {
        return res.status(401).json({
            error: true,
            message: "You are not authorized."
        })
    }
    if (!email) {
        return res.status(401).json({
            error: true,
            message: "You are not authorized."
        })
    }
    try {
        const { status, ...rest } = await createProfile(profile, email);
        if (status) {
            return res.status(status).json(rest);
        } else {
            return res.json(rest);
        }
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: "Internal Server Error",
            status: 500
        }
    }
}

exports.updateUserProfile = async (req, res) => {
    const { profile, edit } = req.body;
    const { email } = profile;
    if (!profile) {
        return res.status(401).json({
            error: true,
            message: "You are not authorized."
        })
    }
    if (!email) {
        return res.status(401).json({
            error: true,
            message: "You are not authorized."
        })
    }
    try {
        const { status, ...rest } = await editProfile(profile, email, edit);
        if (status) {
            return res.status(status).json(rest);
        } else {
            return res.json(rest);
        }
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: "Internal Server Error",
            status: 500
        }
    }
}
