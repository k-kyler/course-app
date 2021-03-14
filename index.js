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
const notificationRoute = require("./routes/notification.route");

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

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Default app endpoint
app.get("/", (req, res) => {
    if (req.signedCookies.userFullName) {
        res.render("index", {
            userFullName: req.signedCookies.userFullName,
        });
    } else {
        res.render("index");
    }
});

// User log out endpoint
app.get("/logout", (req, res) => {
    res.clearCookie("userId");
    res.clearCookie("userFullName");
    res.redirect("/");
});

// Use routes
app.use("/auth", isAuthMiddleware.preventWhenLogged, authRoute); // Login and register routes
app.use("/info", infoRoute); // info routes of courses and teachers
app.use("/dashboard/admin", authMiddleware.requireAuth, adminDashboardRoute); // Admin routes
app.use("/notification", authMiddleware.requireAuth, notificationRoute); // Notification handlers routes

// Server listen
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
