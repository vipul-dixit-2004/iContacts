const { default: mongoose } = require("mongoose");
const mobNo = new mongoose.Schema({ mob_id: String });
const contactSchema = new mongoose.Schema({
  saved_by: mongoose.Types.ObjectId,
  person_name: {
    type: String,
    require: true,
  },
  mob: [mobNo],
  profile_img: String,
});

const Contacts = mongoose.model("Contacts", contactSchema);

module.exports = Contacts;
