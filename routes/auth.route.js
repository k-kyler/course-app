const express = require("express");
const controller = require("../controllers/auth.controller");

let router = express.Router();

router.get("/register", controller.register);
router.post("/register", controller.postRegister);
router.get("/login", controller.login);
router.post("/login", controller.postLogin);

module.exports = router;
