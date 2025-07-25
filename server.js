// SETUP
require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const path = require("path");
const morgan = require("morgan");
const passUserToView = require("./middleware/pass-user-to-view.js");
const passTitleToView = require("./middleware/pass-title-to-view.js");
const methodOverride = require("method-override");
const session = require("express-session");

const authController = require("./controllers/auth.js");
const postsController = require("./controllers/posts.js");

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false, }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
    }),
}));
app.use(passUserToView);
app.use(passTitleToView);

// ROUTES
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use("/", postsController);

app.use("/auth", authController);

// STARTING THE SERVER
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});