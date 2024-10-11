const User = require("../models/user.model");
const Certificate = require("../models/certificate.model");
const Education = require("../models/education.model");
const Project = require("../models/project.model");
const isField = (edit, name) => {
    if (edit.indexOf(name) != -1) {
        return true;
    }
    return false;
}
const getProfile = async (email) => {
    try {
        console.log("GET REQUEST ", email)
        if (email) {
            const user = await User.findOne({ email });
            let profile = {}
            if (!user) {
                return {
                    error: true,
                    message: "User not found",
                    status: 404
                }
            }
            let { projects, certificates, education, name, phone, state, skills, resume, portfolio, bio, preferredJobType, preferredWorkMode, linkedin, languages } = user;
            if (projects && projects.length != 0) {
                profile.projects = await Project.find({ _id: { $in: projects } }, { __v: 0 });
            }
            if (certificates) {
                profile.certificates = await Certificate.find({ _id: { $in: certificates } }, { __v: 0 });
            }
            if (education) {
                profile.education = await Education.findOne({ _id: education }, { __v: 0 })
            }
            if (name) {
                profile.name = name;
            }
            if (email) {
                profile.email = email;
            }
            if (phone) {
                profile.phone = phone;
            }
            if (state) {
                profile.state = state;
            }
            if (skills && skills.length != 0) {
                profile.skills = skills;
            }
            if (resume) {
                profile.resume = resume;
            }
            if (portfolio) {
                profile.portfolio = portfolio;
            }
            if (bio) {
                profile.bio = bio;
            }
            if (preferredJobType) {
                profile.preferredJobType = preferredJobType;
            }
            if (preferredWorkMode) {
                profile.preferredWorkMode = preferredWorkMode;
            }
            if (linkedin) {
                profile.linkedin = linkedin;
            }
            if (languages && languages.length != 0) {
                profile.languages = languages;
            }
            return {
                error: false,
                message: "User profile fetched successfully",
                profile: profile,
            }
        } else {
            return {
                error: true,
                message: "Invalid Credentials",
                status: 401
            }
        }
    }
    catch (err) {
        return {
            error: true,
            message: "Internal Server Error",
            status: 500
        }
    }
}
exports.createProfile = async (profile, email) => {
    try {
        console.log("CREATE REQUEST ", email)
        const user = new User({ email });
        const { projects, certificates, education } = profile;
        if (certificates && certificates?.length != 0) {
            let len = certificates.length;
            for (let i = 0; i < len; i++) {
                const newCert = new Certificate({ ...certificates[i] });
                const doc = await newCert.save();
                user.certificates.push(doc._id);
            }
        }
        if (projects && projects?.length != 0) {
            let len = projects.length;
            for (let i = 0; i < len; i++) {
                const newProj = new Project({ ...projects[i] });
                const doc = await newProj.save();
                user.projects.push(doc._id);
            }
        }
        if (education) {
            const educat = new Education({ ...education });
            const doc = await educat.save();
            user.education = doc._id;
        }
        if (profile?.name) {
            user.name = profile.name;
        }
        if (profile?.phone) {
            user.phone = profile.phone;
        }
        if (profile?.state) {
            user.state = profile.state;
        }
        if (profile?.skills) {
            user.skills = profile.skills;
        }
        if (profile?.resume) {
            user.resume = profile.resume;
        }
        if (profile?.portfolio) {
            user.portfolio = profile.portfolio;
        }
        if (profile?.bio) {
            user.bio = profile.bio;
        }
        if (profile?.preferredJobType) {
            user.preferredJobType = profile.preferredJobType;
        }
        if (profile?.preferredWorkMode) {
            user.preferredWorkMode = profile.preferredWorkMode;
        }
        if (profile?.linkedin) {
            user.linkedin = profile.linkedin;
        }
        if (profile?.languages) {
            user.languages = profile.languages;
        }
        const userDoc = await user.save();
        const getData = await getProfile(email);
        return {
            error: false,
            message: "Profile Created successfully",
            profile: getData.profile
        }
    }
    catch (err) {
        console.log(err);
        return {
            error: true,
            message: "Internal Server Error",
            status: 500
        }
    }
}
exports.editProfile = async (profile, email, edit) => {
    try {
        console.log("EDIT REQUEST", edit);
        const user = await User.findOne({ email });
        if (!user) {
            return {
                error: true,
                message: "First Create User. Wrong request!"
            }
        }
        const { projects, certificates, education } = profile;
        if (certificates && certificates?.length != 0 && isField(edit, "certificates")) {
            let arr = [], len = certificates.length;
            for (let i = 0; i < len; i++) {
                if (certificates[i]?._id) {
                    const isExist = await Certificate.findOne({ _id: certificates[i]._id });
                    if (isExist) {
                        if (certificates[i]?.name) isExist.name = certificates[i].name;
                        if (certificates[i]?.url) isExist.url = certificates[i].url;
                        if (certificates[i]?.validityFromYear) isExist.validityFromYear = certificates[i].validityFromYear;
                        if (certificates[i]?.validityFromMonth) isExist.validityFromMonth = certificates[i].validityFromMonth;
                        if (certificates[i]?.validityToYear) isExist.validityToYear = certificates[i].validityToYear;
                        if (certificates[i]?.validityToMonth) isExist.validityToMonth = certificates[i].validityToMonth;
                        if (certificates[i]?.alwaysValid) isExist.alwaysValid = certificates[i].alwaysValid;
                        await isExist.save();
                        arr.push(isExist._id);
                    } else {
                        const newCert = new Certificate({ ...certificates[i] });
                        const doc = await newCert.save();
                        arr.push(doc._id);
                    }
                } else {
                    const newCert = new Certificate({ ...certificates[i] });
                    const doc = await newCert.save();
                    arr.push(doc._id);
                }
            }
            user.certificates = arr;
        }
        if (projects && projects?.length != 0 && isField(edit, "projects")) {
            let arr = [], len = projects.length;
            for (let i = 0; i < len; i++) {
                if (projects[i]?._id) {
                    const isExist = await Project.findOne({ _id: projects[i]._id });
                    if (isExist) {
                        if (projects[i]?.title) isExist.title = projects[i].title;
                        if (projects[i]?.projectTag) isExist.projectTag = projects[i].projectTag;
                        if (projects[i]?.deliveredTo) isExist.deliveredTo = projects[i].deliveredTo;
                        if (projects[i]?.status) isExist.status = projects[i].status;
                        if (projects[i]?.projectDetails) isExist.projectDetails = projects[i].projectDetails;
                        if (projects[i]?.workedFromYear) isExist.workedFromYear = projects[i].workedFromYear;
                        if (projects[i]?.workedFromMonth) isExist.workedFromMonth = projects[i].workedFromMonth;
                        if (projects[i]?.workedToYear) isExist.workedToYear = projects[i].workedToYear;
                        if (projects[i]?.workedToMonth) isExist.workedToMonth = projects[i].workedToMonth;
                        await isExist.save();
                        arr.push(isExist._id);
                    }
                    else {
                        const newProj = new Project({ ...projects[i] });
                        const doc = await newProj.save();
                        arr.push(doc._id);
                    }
                } else {
                    const newProj = new Project({ ...projects[i] });
                    const doc = await newProj.save();
                    arr.push(doc._id);
                }
            }
            user.projects = arr;
        }
        if (education && isField(edit, "education")) {
            if (education?._id) {
                let edu = await Education.findOne({ _id: education._id });
                if (edu) {
                    if (education?.profession) edu.profession = education.profession;
                    if (education?.institutionName) edu.institutionName = education.institutionName;
                    if (education?.degree) edu.degree = education.degree;
                    if (education?.year) edu.year = education.year;
                    if (education?.currentJobtitle) edu.currentJobtitle = education.currentJobtitle;
                    await edu.save();
                    user.education = edu._id;
                } else {
                    const educat = new Education({ ...education });
                    const doc = await educat.save();
                    user.education = doc._id;
                }

            } else {
                const educat = new Education({ ...education });
                const doc = await educat.save();
                user.education = doc._id;
            }

        }
        if (profile?.name) {
            user.name = profile.name;
        }
        if (profile?.phone) {
            user.phone = profile.phone;
        }
        if (profile?.state && isField(edit, "state")) {
            user.state = profile.state;
        }
        if (profile?.skills && isField(edit, "skills")) {
            user.skills = profile.skills;
        }
        if (profile?.resume && isField(edit, "resume")) {
            user.resume = profile.resume;
        }
        if (profile?.portfolio && isField(edit, "portfolio")) {
            user.portfolio = profile.portfolio;
        }
        if (profile?.bio && isField(edit, "bio")) {
            user.bio = profile.bio;
        }
        if (profile?.preferredJobType && isField(edit, "preferredJobType")) {
            user.preferredJobType = profile.preferredJobType;
        }
        if (profile?.preferredWorkMode && isField(edit, "preferredWorkMode")) {
            user.preferredWorkMode = profile.preferredWorkMode;
        }
        if (profile?.linkedin && isField(edit, "linkedin")) {
            user.linkedin = profile.linkedin;
        }
        if (profile?.languages && isField(edit, "languages")) {
            user.languages = profile.languages;
        }
        const userDoc = await user.save();
        const getData = await getProfile(email);
        return {
            error: false,
            message: "Profile Updated successfully",
            profile: getData.profile
        }
    }
    catch (err) {
        console.log(err);
        return {
            error: true,
            message: "Internal Server Error",
            status: 500
        }
    }
}

exports.getProfile = getProfile;