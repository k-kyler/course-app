const User = require("../models/user.model");
const Invoice = require("../models/invoice.model");

module.exports.addPayment = async (req, res) => {
    let { studentId, tuitionFee } = req.params;
    let { coursesArray } = req.body;
    let user = await User.findById(req.signedCookies.userId);
    let invoices = await Invoice.find({ studentId: studentId });
    let convertCoursesArray = JSON.parse(coursesArray).map((course) => {
        return {
            courseId: course,
        };
    });
    let invoice = invoices.filter((invoice) => {
        if (invoice.status === "Nợ học phí") {
            return invoice;
        }
    });
    let checkExistedDebt = false;

    invoice = invoice[0];

    if (invoice) {
        for (let i in invoice.courses.map((course) => {
            return {
                courseId: course.courseId,
            };
        })) {
            for (let j in convertCoursesArray) {
                if (i.courseId === j.courseId) {
                    checkExistedDebt = true;
                } else {
                    checkExistedDebt = false;
                }
            }
        }
    }

    if (
        invoice &&
        checkExistedDebt === true &&
        invoice.tuitionFee === parseInt(tuitionFee)
    ) {
        res.json({
            code: 1,
            message: "Đã có khoản thanh toán. ",
        });
    } else if (
        invoice &&
        invoice.tuitionFee !== parseInt(tuitionFee) &&
        parseInt(tuitionFee) !== 0
    ) {
        let updatePayment = await Invoice.findOneAndUpdate(
            { studentId: studentId, status: "Nợ học phí" },
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
    } else if (!invoice && parseInt(tuitionFee) !== 0) {
        let i = new Invoice();

        i.studentId = user.studentId;
        i.studentName = user.fullname;
        i.status = "Nợ học phí";
        i.payHistory = [];
        i.tuitionFee = tuitionFee;
        i.courses = convertCoursesArray;
        i.save();

        res.json({
            code: 1,
            message: "Thêm khoản thanh toán thành công. ",
        });
    } else if (!invoice && parseInt(tuitionFee) === 0) {
        res.json({
            code: 0,
            message: "Không có môn học đăng ký.",
        });
    } else if (invoice && parseInt(tuitionFee) === 0) {
        let removeInvoice = await Invoice.findOneAndRemove({
            studentId: studentId,
            status: "Nợ học phí",
        });

        res.json({
            code: 0,
            message: "Không có môn học đăng ký.",
        });
    }
};
