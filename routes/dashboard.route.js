const express = require("express");
const controller = require("../controllers/dashboard.controller");

let router = express.Router();

// Admin routes
router.get("/admin/notification", controller.adminNotification);
router.get("/admin/course", controller.adminCourse);
router.get("/admin/schedule", controller.adminSchedule);

module.exports = router;
