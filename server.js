const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();
const User = require("./models/user");

const dotenv = require("dotenv");
// load env
dotenv.config();

// initialize passport
const initializePassport = require("./util/passport_config");
initializePassport(
  passport,
  async (email) => {
    const user = await User.findOne({ email, role: ROLES.ADMIN });
    return user;
  },
  async (id) => {
    const user = await User.findOne({ _id: id, role: ROLES.ADMIN });
    return user;
  }
);

try {
  mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (e) {
  console.log(e);
}

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

var routes = require("./routes");
const { ROLES } = require("./config/constant");
app.use("/", routes);

app.listen(4000, () => {
  console.log("Server running !!!");
});
