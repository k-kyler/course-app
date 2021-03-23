const Invoice = require("../models/invoice.model");
const Course = require("../models/course.model");

module.exports.registeredCourses = async (req, res) => {
    let { invoiceId } = req.params;
    let invoice = await Invoice.findById(invoiceId);

    if (invoice) {
        let courses = invoice.courses;
        let data = [];

        for (let course of courses) {
            data.push(await Course.findOne({ courseId: course.courseId }));
        }

        res.json({
            code: 1,
            data,
            message: "Lấy dữ liệu hóa đơn thành công",
        });
    } else {
        res.json({
            code: 0,
            message: "Hóa đơn thanh toán không tồn tại",
        });
    }
};
