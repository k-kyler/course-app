const User = require("../models/user.model");
const md5 = require("md5");

module.exports.register = (req, res) => {
    let error = req.flash("errorRegister")[0];

    if (error) {
        res.render("auth/register", {
            error: error.error,
            registerData: error.registerData,
        });
    } else {
        res.render("auth/register");
    }
};

module.exports.postRegister = async (req, res) => {
    // Get form input data
    let email = req.body.email;
    let password = req.body.password;

    // Hashed input password
    let hashedPassword = md5(password);

    // Find user info by input email
    let user = await User.findOne({ email: email });

    // Check user info
    if (!user) {
        req.flash("errorLogIn", {
            error: "Account does not exist",
            logInData: {
                email,
                password,
            },
        });
        res.redirect("/login");
        return;
    }

    // Check user input password
    if (user.password !== hashedPassword) {
        req.flash("errorLogIn", {
            error: "Wrong password",
            logInData: {
                email,
                password,
            },
        });
        res.redirect("/login");
        return;
    }

    // If login success then generating user's cookie
    res.cookie("userId", user._id, {
        signed: true,
    });

    res.cookie("userName", user.name, {
        signed: true,
    });

    // Redirect user to dashboard
    res.redirect("/dashboard");
};

module.exports.login = (req, res) => {
    let error = req.flash("errorLogIn")[0];

    if (error) {
        res.render("auth/login", {
            error: error.error,
            logInData: error.logInData,
        });
    } else {
        res.render("auth/login");
    }
};

module.exports.postLogin = async (req, res) => {
    // Get form input data
    let email = req.body.email;
    let password = req.body.password;

    // Hashed input password
    let hashedPassword = md5(password);

    // Find user info by input email
    let user = await User.findOne({ email: email });

    // Check user info
    if (!user) {
        req.flash("errorLogIn", {
            error: "Account does not exist",
            logInData: {
                email,
                password,
            },
        });
        res.redirect("/login");
        return;
    }

    // Check user input password
    if (user.password !== hashedPassword) {
        req.flash("errorLogIn", {
            error: "Wrong password",
            logInData: {
                email,
                password,
            },
        });
        res.redirect("/login");
        return;
    }

    // If login success then generating user's cookie
    res.cookie("userId", user._id, {
        signed: true,
    });

    res.cookie("userName", user.name, {
        signed: true,
    });

    // Redirect user to dashboard
    res.redirect("/dashboard");
};
