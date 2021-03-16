const User = require("../models/user.model");

module.exports.infoTeacher = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);

    res.render("info/teacher", {
        user,
    });
};

module.exports.infoCourse = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);

    res.render("info/course", {
        user,
    });
};
