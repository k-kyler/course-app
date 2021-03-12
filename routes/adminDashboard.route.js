const express = require("express");
const controller = require("../controllers/adminDashboard.controller");

let router = express.Router();

router.get("/notification", controller.adminNotification);
router.get("/course", controller.adminCourse);
router.get("/schedule", controller.adminSchedule);
router.get("/student", controller.adminStudent);
router.get("/teacher", controller.adminTeacher);

module.exports = router;
