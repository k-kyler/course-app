const User = require("../models/user.model");
const Role = require("../models/role.model");
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
        newUser.description = "";
        newUser.role = 4;
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

    if (error) {
        res.render("auth/login", {
            error: error.error,
            logInData: error.logInData,
        });
    } else if (!error) {
        res.render("auth/login");
    } else if (registerSuccessful) {
        res.render("auth/login", {
            success: registerSuccessful,
        });
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

    // Get role data
    let role = await Role.findOne({ number: user.role });

    // Check empty
    if (email === "") {
        req.flash("errorLogIn", {
            error: "Email không được bỏ trống",
            logInData: {
                email,
                password,
            },
        });
        res.redirect("/auth/login");
        return;
    }

    if (password === "") {
        req.flash("errorLogIn", {
            error: "Mật khẩu không được bỏ trống",
            logInData: {
                email,
                password,
            },
        });
        res.redirect("/auth/login");
        return;
    }

    // Check email
    if (!email.includes("@")) {
        req.flash("errorLogIn", {
            error: "Email không hợp lệ",
            logInData: {
                email,
                password,
            },
        });
        res.redirect("/auth/login");
        return;
    }

    // Check user info
    if (!user) {
        req.flash("errorLogIn", {
            error: "Tài khoản không tồn tại",
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
            error: "Sai mật khẩu",
            logInData: {
                email,
                password,
            },
        });
        res.redirect("/auth/login");
        return;
    }

    if (password.length < 6) {
        req.flash("errorLogIn", {
            error: "Mật khẩu phải ít nhất 6 ký tự",
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

    if (role.number === 5) {
        res.redirect("/dashboard/admin");
    } else if (role.number === 4) {
        res.redirect("/dashboard/student");
    } else if (role.number === 2) {
        res.redirect("/dashboard/teacher");
    }
};
