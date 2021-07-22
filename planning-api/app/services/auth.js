const jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = process.env.TOKEN_SECRET;

module.exports = {
  generateToken(userData) {
    return jwt.sign({ userID: userData.id }, JWT_SIGN_SECRET, { expiresIn: "1h" });
  },
};
