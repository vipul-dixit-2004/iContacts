const Users = require("../Schema/user");
const Contacts = require("../Schema/contacts");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
  try {
    const { user_name, user_email, mob, password } = req.body;
    const encPwd = bcrypt.hashSync(password, 10);
    const response = await Users.create({
      user_name,
      user_email,
      mob,
      password: encPwd,
    });
    res.json({
      status: true,
    });
  } catch (errors) {
    console.log(errors);
    res.json({ status: false, error: "Error while creating user" });
  }
};

const login = async (req, res) => {
  try {
    //check weather user exists
    const user = await Users.findOne({ user_email: req.body.user_email });
    if (!user) return res.sendStatus(401); //unauthorised access

    //Matching password
    const pwdMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!pwdMatch) return res.sendStatus(401); //unauthorised access

    //creating jsonwebtoken
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; //for 30 days
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET_KEY);

    //creating a cookie
    res.cookie("Authentication", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    //sending it back
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.json({ status: false, error: "Error while loging in" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("Authentication");
  res.sendStatus(200);
};
const checkAuth = (req, res) => {
  //   console.log(req.user);
  res.sendStatus(200);
};
module.exports = {
  createUser,
  login,
  checkAuth,
  logout,
};
