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
    if (req.signedCookies.userName) {
        res.render("index", {
            userName: req.signedCookies.userName,
        });
    } else {
        res.render("index");
    }
});

// User log out endpoint
app.get("/logout", (req, res) => {
    res.clearCookie("userId");
    res.clearCookie("userName");
    res.redirect("/");
});

// Use routes
app.use("/auth", isAuthMiddleware.preventWhenLogged, authRoute);
app.use("/info", infoRoute);

// Server listen
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
