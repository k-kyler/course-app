const express = require("express");
const controller = require("../controllers/courseEnroll.controller");

let router = express.Router();

router.post("/enroll/:id", controller.enrollCourse);
router.put("/cancel/:id", controller.cancelCourse);

module.exports = router;
