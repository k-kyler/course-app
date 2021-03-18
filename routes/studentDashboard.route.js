const express = require("express");
const controller = require("../controllers/studentDashboard.controller");

let router = express.Router();

router.get("/", controller.studentNotification);
router.get("/course", controller.studentCourse);
router.get("/schedule", controller.studentSchedule);
router.get("/tuitionfee", controller.studentTuitionFee);

module.exports = router;
