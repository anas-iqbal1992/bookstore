var jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../src/models/Users");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }
  if (token) {
    jwt.verify(token, keys.jwtSecret, async (err, decode) => {
      if (err) {
        res.status(401).json({ error: "fail to authenticate" });
      } else {
        const user = await User.findOne({
          where: { id: decode.id },
          attributes: ["name", "id", "email", "phone_no"],
        });
        if (!user) {
          res.status(404).json({ error: "No such user Found" });
        }
        req.currentUser = user;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "unauthorized access" });
  }
};
