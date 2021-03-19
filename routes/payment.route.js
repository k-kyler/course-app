const express = require("express");
const controller = require("../controllers/payment.controller");

let router = express.Router();

router.post("/:studentId/:tuitionFee", controller.addPayment);

module.exports = router;
