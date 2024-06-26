const { default: mongoose } = require("mongoose");
// const mobNo = new mongoose.Schema({ mob_id: String });
const userSchema = new mongoose.Schema({
  user_name: String,
  user_email: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
  },
  mob: String,
  password: String,
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
