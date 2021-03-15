const User = require("../models/user.model");
const { v4: v4UniqueId } = require("uuid");
const md5 = require("md5");

// Get teacher by id
module.exports.getTeacher = async (req, res) => {
    let teacher = await User.findOne({
        teacherId: req.params.id,
    });

    if (teacher) {
        res.json({
            code: 1,
            data: teacher,
        });
    } else if (!teacher) {
        res.json({
            code: 0,
            message: "Giảng viên không tồn tại",
        });
    }
};

// Add teacher
module.exports.addTeacher = async (req, res) => {
    let { fullname, phone, email, password, description, address } = req.body;
    let teacher = await User.findOne({ email });

    if (fullname === "") {
        res.json({
            code: 0,
            message: "Tên giảng viên không được bỏ trống",
        });
    } else if (phone === "") {
        res.json({
            code: 0,
            message: "Số điện thoại giảng viên không được bỏ trống",
        });
    } else if (email === "") {
        res.json({
            code: 0,
            message: "Email giảng viên không được bỏ trống",
        });
    } else if (password === "") {
        res.json({
            code: 0,
            message: "Mật khẩu giảng viên không được bỏ trống",
        });
    } else if (address === "") {
        res.json({
            code: 0,
            message: "Địa chỉ giảng viên không được bỏ trống",
        });
    } else if (description === "") {
        res.json({
            code: 0,
            message: "Mô tả giảng viên không được bỏ trống",
        });
    } else if (teacher) {
        res.json({
            code: 0,
            message: "Giảng viên đã tồn tại",
        });
    } else {
        let teacher = new User();
        let teacherId = v4UniqueId();

        teacher.teacherId = teacherId;
        teacher.fullname = fullname;
        teacher.phone = phone;
        teacher.email = email;
        teacher.password = md5(password);
        teacher.description = description;
        teacher.address = address;
        teacher.studentId = "";
        teacher.role = 2;
        teacher.save();

        res.json({
            code: 1,
            message: "Thêm giảng viên thành công",
            data: {
                teacherId,
                fullname,
                phone,
                email,
                description,
                address,
            },
        });
    }
};

// Edit teacher
module.exports.editTeacher = async (req, res) => {
    let { fullname, phone, email, password, description, address } = req.body;
    let { id } = req.params;

    if (fullname === "") {
        res.json({
            code: 0,
            message: "Tên giảng viên không được bỏ trống",
        });
    } else if (phone === "") {
        res.json({
            code: 0,
            message: "Số điện thoại giảng viên không được bỏ trống",
        });
    } else if (email === "") {
        res.json({
            code: 0,
            message: "Email giảng viên không được bỏ trống",
        });
    } else if (address === "") {
        res.json({
            code: 0,
            message: "Địa chỉ giảng viên không được bỏ trống",
        });
    } else if (description === "") {
        res.json({
            code: 0,
            message: "Mô tả giảng viên không được bỏ trống",
        });
    } else if (password === "") {
        let teacher = await User.findOneAndUpdate(
            { teacherId: id },
            {
                fullname,
                phone,
                email,
                description,
                address,
            },
            { new: true }
        );

        res.json({
            code: 1,
            message: "Cập nhật giảng viên thành công",
            data: {
                fullname,
                phone,
                email,
                description,
                address,
            },
        });
    } else if (password !== "") {
        let teacher = await User.findOneAndUpdate(
            { teacherId: id },
            {
                fullname,
                phone,
                email,
                description,
                password: md5(password),
                address,
            },
            { new: true }
        );

        res.json({
            code: 1,
            message: "Cập nhật giảng viên thành công",
            data: {
                fullname,
                phone,
                email,
                description,
                address,
            },
        });
    }
};

// Delete teacher
module.exports.deleteTeacher = async (req, res) => {
    let { id } = req.params;
    let teacher = await User.deleteOne({ teacherId: id });

    res.json({
        code: 1,
        message: "Xóa giảng viên thành công",
    });
};
