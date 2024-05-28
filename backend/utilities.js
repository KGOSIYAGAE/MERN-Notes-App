const jwt = require("jsonwebtoken");

//Authenticate Toke
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401);
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(41);
    }

    req.user = user;
    next();
  });
}

//Create new Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3600m" });
};

module.exports = { authenticateToken, createToken };
