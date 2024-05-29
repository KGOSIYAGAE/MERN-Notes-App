const jwt = require("jsonwebtoken");
const User = require("./models/user.model");

//Token authentication middleware
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Athorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication required" });
  }
};

//Create new Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3600m" });
};

module.exports = { requireAuth, createToken };

/*Authenticate Toke
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

    req._id = user._id;
    next();
  });
}*/
