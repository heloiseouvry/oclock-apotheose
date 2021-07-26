const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  try {
    const token = req.header("Authorization").slice(7);
    if(!token){
      res.status(403).json({error: "Non-authorized"})
    }
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verify;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({error: "Token invalid"});
  }
}