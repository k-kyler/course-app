const express = require("express");
const controller = require("../controllers/teacher.controller");

let router = express.Router();

router.get("/:id", controller.getTeacher);
router.post("/", controller.addTeacher);
router.put("/edit/:id", controller.editTeacher);
router.delete("/delete/:id", controller.deleteTeacher);

module.exports = router;
