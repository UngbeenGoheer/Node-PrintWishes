const mongoose = require("mongoose");
const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb://localhost:27017/PW"
    );
    console.log(
      `DB Connected || DB hosting on ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("An error is occure while DB connected");
  }
};
module.exports = { ConnectDB };
