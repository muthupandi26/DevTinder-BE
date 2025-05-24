const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://pmuthupandi:KPaES92ZKwNMmdzZ@cluster0.dvt67yy.mongodb.net/devTinderApp"
  );
};

module.exports = connectDB;
