const mongoose = require("mongoose");

let invoiceSchema = new mongoose.Schema({
    studentId: String,
    studentName: String,
    tuitionFee: Number,
    status: String,
    payHistory: [
        {
            payer: String,
            date: String,
        },
    ],
});

let Invoice = mongoose.model("Invoice", invoiceSchema, "invoices");

module.exports = Invoice;
