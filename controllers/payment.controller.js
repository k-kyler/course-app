const User = require("../models/user.model");
const Invoice = require("../models/invoice.model");

module.exports.addPayment = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let { tuitionFee } = req.body;
    let { id } = req.params;
    let invoice = await Invoice.findOne({ studentId: id });

    if (invoice && invoice.status === "Debt") {
        res.json({
            code: 1,
            message: "",
        });
    } else if (invoice && invoice.tuitionFee !== tuitionFee) {
        let updatePayment = await Invoice.findOneAndUpdate(
            { studentId: id },
            {
                tuitionFee,
            },
            { new: true }
        );

        res.json({
            code: 1,
            message: "Đã cập nhật khoản thanh toán",
        });
    } else if (!invoice) {
        let i = new Invoice();

        i.studentId = user.studentId;
        i.studentName = user.fullname;
        i.status = "Debt";
        i.payHistory = [];
        i.tuitionFee = tuitionFee;
        i.save();

        res.json({
            code: 1,
            message: "Thêm khoản thanh toán thành công. ",
        });
    }
};
