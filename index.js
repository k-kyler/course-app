// Require variables from .env
require("dotenv").config();

// Initial express
const express = require("express");

// Initial cookie-parser
const cookieParser = require("cookie-parser");

// Initial mongoose
const mongoose = require("mongoose");

// Initial express flash
const flash = require("express-flash");

// Initial express session
const session = require("express-session");

// Require routes
const authRoute = require("./routes/auth.route");
const infoRoute = require("./routes/info.route");
const adminDashboardRoute = require("./routes/adminDashboard.route");
const studentDashboardRoute = require("./routes/studentDashboard.route");
const teacherDashboardRoute = require("./routes/teacherDashboard.route");
const notificationRoute = require("./routes/notification.route");
const courseRoute = require("./routes/course.route");
const teacherRoute = require("./routes/teacher.route");
const studentRoute = require("./routes/student.route");
const courseEnrollRoute = require("./routes/courseEnroll.route");
const paymentRoute = require("./routes/payment.route");
const paymentHistoryCoursesRoute = require("./routes/paymentHistoryCourses.route");
const learningScheduleRoute = require("./routes/learningSchedule.route");
const examScheduleRoute = require("./routes/examSchedule.route");

// Require custom middlewares
const authMiddleware = require("./middlewares/auth.middleware");
const isAuthMiddleware = require("./middlewares/isAuth.middleware");

// App setup
const app = express();
const port = process.env.PORT || 9000;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static("public"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Default app endpoint
app.get("/", async (req, res) => {
    if (req.signedCookies.userId) {
        let User = require("./models/user.model");
        let user = await User.findById(req.signedCookies.userId);

        res.render("index", {
            user,
        });
    } else {
        res.render("index");
    }
});

// User log out endpoint
app.get("/logout", (req, res) => {
    res.clearCookie("userId");
    res.redirect("/");
});

// Authentication routes
app.use("/auth", isAuthMiddleware.preventWhenLogged, authRoute); // Login and register routes

// Info routes
app.use("/info", infoRoute); // info routes of courses and teachers

// Admin routes
app.use("/dashboard/admin", authMiddleware.requireAuth, adminDashboardRoute);
app.use("/notification", authMiddleware.requireAuth, notificationRoute); // Notification handlers routes
app.use("/course", authMiddleware.requireAuth, courseRoute); // Course handlers routes
app.use("/teacher", authMiddleware.requireAuth, teacherRoute); // Teacher handlers routes
app.use("/student", authMiddleware.requireAuth, studentRoute); // Student handlers routes

// Student routes
app.use(
    "/dashboard/student",
    authMiddleware.requireAuth,
    studentDashboardRoute
);

// Course enroll routes
app.use("/courseenroll", authMiddleware.requireAuth, courseEnrollRoute);

// Payment routes
app.use("/payment", authMiddleware.requireAuth, paymentRoute);

// Payment history courses routes
app.use(
    "/paymenthistorycourses",
    authMiddleware.requireAuth,
    paymentHistoryCoursesRoute
);

// Teacher routes
app.use(
    "/dashboard/teacher",
    authMiddleware.requireAuth,
    teacherDashboardRoute
);

// Learning schedule routes
app.use("/learningschedule", authMiddleware.requireAuth, learningScheduleRoute);

// Exam schedule routes
app.use("/examschedule", authMiddleware.requireAuth, examScheduleRoute);

// Server listen
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
