const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_URI = process.env["DB_URI"];
mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to DB");
    }
  }
);

module.exports = mongoose;
