const jwt = require("jsonwebtoken");
const Users = require("../Schema/user");
async function requireAuth(req, res, next) {
  try {
    //read cookie
    const token = req.cookies.Authentication;

    //verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (Date.now() > decoded.exp) return res.sendStatus(401);
    //retrieve information
    const user = await Users.findById(decoded.sub);
    if (!user) return res.sendStatus(401);

    //attach user to req
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = requireAuth;
