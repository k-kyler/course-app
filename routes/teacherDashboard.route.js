const express = require("express");
const controller = require("../controllers/teacherDashboard.controller");

let router = express.Router();

router.get("/", controller.teacherNotification);
router.get("/schedule", controller.teacherSchedule);

module.exports = router;
