const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const app = express();
const { ROLES } = require("./config/constant");

// load env
const dotenv = require("dotenv");
dotenv.config();

// connect to DB
try {
  mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (e) {
  console.log(e);
}

// use view engine
app.set("view engine", "ejs");

// use middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// include routes
var routes = require("./routes");
app.use("/", routes);

// start server
app.listen(4000, () => {
  console.log("Server running !!!");
});
