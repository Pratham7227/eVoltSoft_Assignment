const mongoose = require("mongoose");
require("dotenv").config();

const { DATABASEURL } = process.env;

exports.connect = () => {
  mongoose
    .connect(DATABASEURL)
    .then(() => {
      console.log('DB Connection Success');
    })
    .catch((err) => {
      console.log('DB Connection Failed');
      console.error(err);
      process.exit(1);
    });
};
