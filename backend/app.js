require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDb } = require("./connectDb");
const requireAuth = require("./middleware/requireAuth");
const controller_user = require("./controllers/_user");
const controller_contact = require("./controllers/_contact");
//setup application

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT;
connectToDb();

//api routes
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});
//user routes
//create new user
app.post("/createUser", controller_user.createUser);

//login
app.post("/login", controller_user.login);

//logout
app.get("/logout", controller_user.logout);

//check-auth
app.post("/checkAuth", requireAuth, controller_user.checkAuth);

//contact components Routes

//add Contact
app.post("/addContact", controller_contact.addContact);

app.post("/fetchContacts", controller_contact.fetchContacts);

app.listen(PORT, () => {
  console.log("Server is running...");
});
