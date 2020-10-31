const express = require("express");
const mongoose = require("mongoose");
const app = express();

const dotenv = require("dotenv");
// load env
dotenv.config();

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

var routes = require("./routes");
app.use("/", routes);

app.listen(4000, () => {
  console.log("Server running !!!");
});
