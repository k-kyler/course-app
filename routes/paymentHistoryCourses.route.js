const express = require("express");
const controller = require("../controllers/paymentHistoryCourses.controller");

let router = express.Router();

router.post("/:invoiceId", controller.registeredCourses);

module.exports = router;
