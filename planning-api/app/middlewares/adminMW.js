const { User } = require('../models');

module.exports = async function (req, res, next) {
  const userById = await User.findById(req.user.userID);
  console.log(userById);
  if(userById.role === 'cdp'){
    return next();
  } else {
    return res.status(403).json({error: "Non-authorized"});
  }
}