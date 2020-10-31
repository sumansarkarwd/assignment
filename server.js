const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const methodOverride = require("method-override");
const app = express();

try {
  mongoose.connect("mongodb://localhost/webskitters_assignment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (e) {
  console.log(e);
}

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

var routes = require("./routes");
app.use("/", routes);

app.listen(4000, () => {
    console.log('Server running !!!');
});
