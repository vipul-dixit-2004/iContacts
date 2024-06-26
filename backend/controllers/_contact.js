const { default: mongoose } = require("mongoose");
const Contacts = require("../Schema/contacts");

const fetchContacts = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body._id))
      res.status(400).json({ err: "bad request" });

    const user_id = new mongoose.Types.ObjectId(req.body._id);
    const response = await Contacts.find({
      saved_by: user_id,
    });

    res.status(200).json(response);
  } catch (errors) {
    console.log(errors);
    res.json({ status: false, msg: "Error while fetching Contacts" });
  }
};
const addContact = async (req, res) => {
  try {
    const { saved_by, person_name, mob, profile_img } = req.body;
    await Contacts.create({
      saved_by,
      person_name,
      mob,
      profile_img,
    });
    res.json({ status: true });
  } catch (errors) {
    console.log(errors);
    res.json({ status: false, msg: "Error while adding contact" });
  }
};

module.exports = {
  addContact,
  fetchContacts,
};
