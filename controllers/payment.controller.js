const User = require("../models/user.model");
const Invoice = require("../models/invoice.model");

module.exports.addPayment = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let { studentId, tuitionFee } = req.params;
    let invoice = await Invoice.findOne({ studentId: studentId });
    let { coursesArray } = req.body;
    let convertCoursesArray = JSON.parse(coursesArray).map((course) => {
        return {
            courseId: course,
        };
    });

    if (
        invoice &&
        invoice.status === "Debt" &&
        invoice.tuitionFee === parseInt(tuitionFee)
    ) {
        res.json({
            code: 1,
            message: "Đã có khoản thanh toán. ",
        });
    } else if (
        invoice &&
        invoice.status === "Debt" &&
        invoice.tuitionFee !== parseInt(tuitionFee)
    ) {
        let updatePayment = await Invoice.findOneAndUpdate(
            { studentId: studentId },
            {
                tuitionFee: parseInt(tuitionFee),
                courses: convertCoursesArray,
            },
            { new: true }
        );

        res.json({
            code: 1,
            message: "Đã cập nhật khoản thanh toán. ",
        });
    } else if (!invoice) {
        let i = new Invoice();

        i.studentId = user.studentId;
        i.studentName = user.fullname;
        i.status = "Debt";
        i.payHistory = [];
        i.tuitionFee = tuitionFee;
        i.courses = convertCoursesArray;
        i.save();

        res.json({
            code: 1,
            message: "Thêm khoản thanh toán thành công. ",
        });
    }
};
