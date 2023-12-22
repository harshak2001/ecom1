const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB connection successfull ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error in connecting database ${error}`);
  }
};

module.exports = connectDB;
