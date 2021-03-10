const express = require("express");
const controller = require("../controllers/info.controller");

let router = express.Router();

router.get("/teacher", controller.infoTeacher);
router.get("/course", controller.infoCourse);

module.exports = router;
