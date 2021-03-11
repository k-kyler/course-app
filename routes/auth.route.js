const express = require("express");
const controller = require("../controllers/auth.controller");
const { check } = require("express-validator");

const validators = [
    check("fullname")
        .exists()
        .withMessage("Vui lòng nhập họ tên")
        .notEmpty()
        .withMessage("Không đuợc bỏ trống họ tên"),

    check("phone")
        .exists()
        .withMessage("Vui lòng nhập số điện thoại")
        .notEmpty()
        .withMessage("Không được bỏ trống số điện thoại")
        .isLength({ min: 10, max: 10 })
        .withMessage("Số điện thoại không hợp lệ"),

    check("address")
        .exists()
        .withMessage("Vui lòng nhập địa chỉ")
        .notEmpty()
        .withMessage("Không được bỏ trống địa chỉ"),

    check("email")
        .exists()
        .withMessage("Vui lòng nhập email")
        .notEmpty()
        .withMessage("Không được bỏ trống email")
        .isEmail()
        .withMessage("Email không hợp lệ"),

    check("pwd")
        .exists()
        .withMessage("Vui lòng nhập mật khẩu")
        .notEmpty()
        .withMessage("Không được bỏ trống mật khẩu")
        .isLength({ min: 6 })
        .withMessage("Mật khẩu phải ít nhất 6 ký tự"),

    check("cfpwd")
        .exists()
        .withMessage("Vui lòng xác nhận mật khẩu")
        .notEmpty()
        .withMessage("Không được bỏ trống xác nhận mật khẩu")
        .custom((value, { req }) => {
            if (value !== req.body.pwd) {
                throw new Error("Mật khẩu xác nhận không khớp");
            }
            return true;
        }),
];

let router = express.Router();

router.get("/register", controller.register);
router.post("/register", validators, controller.postRegister);
router.get("/login", controller.login);
router.post("/login", controller.postLogin);

module.exports = router;
