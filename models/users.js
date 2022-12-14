const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
