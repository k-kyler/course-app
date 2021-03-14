const express = require("express");
const controller = require("../controllers/course.controller");

let router = express.Router();

router.get("/:id", controller.getCourse);
router.post("/", controller.addCourse);
router.put("/edit/:id", controller.editCourse);
router.delete("/delete/:id", controller.deleteCourse);

module.exports = router;
