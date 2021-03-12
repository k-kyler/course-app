const User = require("../models/user.model");
const md5 = require("md5");
const { validationResult } = require("express-validator");

module.exports.register = (req, res) => {
    let error = req.flash("errorRegister")[0];
    let errorData = req.flash("errorData")[0];

    if (error) {
        res.render("auth/register", {
            error: error.error,
            registerData: error.registerData,
        });
    } else if (errorData) {
        res.render("auth/register", {
            error: errorData.message,
            registerData: {
                fullname: errorData.fullname,
                phone: errorData.phone,
                address: errorData.address,
                email: errorData.email,
                pwd: errorData.pwd,
                cfpwd: errorData.cfpwd,
            },
        });
    } else {
        res.render("auth/register");
    }
};

module.exports.postRegister = async (req, res) => {
    // Get form input data
    let { fullname, phone, address, email, pwd, cfpwd } = req.body;

    // express-validator result
    let result = validationResult(req);

    if (result.errors.length === 0) {
        // Hashed input password
        let hashedPwd = md5(pwd);

        // Find user info by input email
        let user = await User.findOne({ email: email });

        // Check user info
        if (user) {
            req.flash("errorRegister", {
                error: "Account is already existed",
                registerData: {
                    fullname,
                    phone,
                    address,
                    email,
                    pwd,
                    cfpwd,
                },
            });
            res.redirect("/auth/register");
            return;
        }

        // Add new user to db
        let newUser = new User();

        newUser.fullname = fullname;
        newUser.phone = phone;
        newUser.address = address;
        newUser.email = email;
        newUser.password = hashedPwd;
        newUser.role = 0;
        newUser.save();

        // Redirect back to login page
        req.flash("registerSuccessful", "Đăng ký thành công");
        res.redirect("/auth/login");
    } else {
        let message;

        result = result.mapped();
        for (field in result) {
            message = result[field].msg;
            break;
        }
        req.flash("errorData", {
            message,
            fullname,
            phone,
            address,
            email,
            pwd,
            cfpwd,
        });
        res.redirect("/auth/register");
    }
};

module.exports.login = (req, res) => {
    let registerSuccessful = req.flash("registerSuccessful");
    let error = req.flash("errorLogIn")[0];

    if (registerSuccessful) {
        res.render("auth/login", {
            success: registerSuccessful,
        });
    } else if (error) {
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
    let password = req.body.pwd;

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
        res.redirect("/auth/login");
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
        res.redirect("/auth/login");
        return;
    }

    // If login success then generating user's cookie
    res.cookie("userId", user._id, {
        signed: true,
    });

    res.cookie("userFullName", user.fullname, {
        signed: true,
    });

    // Redirect user to dashboard
    if (user.role === 5) {
        res.redirect("/dashboard/admin");
    } else if (user.role === 4) {
        res.redirect("/dashboard/student");
    } else if (user.role === 2) {
        res.redirect("/dashboard/teacher");
    }
};
