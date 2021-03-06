const User = require("../models/user.model");

// Custom middleware to prevent user from accessing important routes if user is not logged in
module.exports.requireAuth = async (req, res, next) => {
    let user = await User.findById(req.signedCookies.userId);

    // Check if user has not logged in
    if (!req.signedCookies.userId) {
        res.redirect("/auth/login");
        return;
    }

    if (!user) {
        res.redirect("/auth/login");
        return;
    }

    next();
};
