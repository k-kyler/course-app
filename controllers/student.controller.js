const User = require("../models/user.model");
const { v4: v4UniqueId } = require("uuid");
const md5 = require("md5");

// Get student by id
module.exports.getStudent = async (req, res) => {
    let student = await User.findOne({
        studentId: req.params.id,
    });

    if (student) {
        res.json({
            code: 1,
            data: student,
        });
    } else if (!student) {
        res.json({
            code: 0,
            message: "Học viên không tồn tại",
        });
    }
};

// Add student
module.exports.addStudent = async (req, res) => {
    let { fullname, phone, email, password, address } = req.body;
    let student = await User.findOne({ email });

    if (fullname === "") {
        res.json({
            code: 0,
            message: "Tên học viên không được bỏ trống",
        });
    } else if (phone === "") {
        res.json({
            code: 0,
            message: "Số điện thoại học viên không được bỏ trống",
        });
    } else if (email === "") {
        res.json({
            code: 0,
            message: "Email học viên không được bỏ trống",
        });
    } else if (password === "") {
        res.json({
            code: 0,
            message: "Mật khẩu học viên không được bỏ trống",
        });
    } else if (address === "") {
        res.json({
            code: 0,
            message: "Địa chỉ học viên không được bỏ trống",
        });
    } else if (student) {
        res.json({
            code: 0,
            message: "Học viên đã tồn tại",
        });
    } else {
        let student = new User();
        let studentId = v4UniqueId();

        student.studentId = studentId;
        student.fullname = fullname;
        student.phone = phone;
        student.email = email;
        student.password = md5(password);
        student.description = "";
        student.teacherId = "";
        student.address = address;
        student.role = 4;
        student.save();

        res.json({
            code: 1,
            message: "Thêm học viên thành công",
            data: {
                studentId,
                fullname,
                phone,
                email,
                address,
            },
        });
    }
};

// Edit student
module.exports.editStudent = async (req, res) => {
    let { fullname, phone, email, password, address } = req.body;
    let { id } = req.params;

    if (fullname === "") {
        res.json({
            code: 0,
            message: "Tên học viên không được bỏ trống",
        });
    } else if (phone === "") {
        res.json({
            code: 0,
            message: "Số điện thoại học viên không được bỏ trống",
        });
    } else if (email === "") {
        res.json({
            code: 0,
            message: "Email học viên không được bỏ trống",
        });
    } else if (address === "") {
        res.json({
            code: 0,
            message: "Địa chỉ học viên không được bỏ trống",
        });
    } else if (password === "") {
        let student = await User.findOneAndUpdate(
            { studentId: id },
            {
                fullname,
                phone,
                email,
                address,
            },
            { new: true }
        );

        res.json({
            code: 1,
            message: "Cập nhật học viên thành công",
            data: {
                fullname,
                phone,
                email,
                address,
            },
        });
    } else if (password !== "") {
        let student = await User.findOneAndUpdate(
            { studentId: id },
            {
                fullname,
                phone,
                email,
                password: md5(password),
                address,
            },
            { new: true }
        );

        res.json({
            code: 1,
            message: "Cập nhật học viên thành công",
            data: {
                fullname,
                phone,
                email,
                address,
            },
        });
    }
};

// Delete student
module.exports.deleteStudent = async (req, res) => {
    let { id } = req.params;
    let student = await User.deleteOne({ studentId: id });

    res.json({
        code: 1,
        message: "Xóa học viên thành công",
    });
};
