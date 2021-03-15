const express = require("express");
const controller = require("../controllers/student.controller");

let router = express.Router();

router.get("/:id", controller.getStudent);
router.post("/", controller.addStudent);
router.put("/edit/:id", controller.editStudent);
router.delete("/delete/:id", controller.deleteStudent);

module.exports = router;
