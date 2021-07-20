const bcrypt = require('bcrypt');
const { User } = require('../models');

const userController = {
    addUser : async (req, res) => {   
      const newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(newUser.password, 10);
    
      try {
        await newUser.save();
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json(error.message);
      }
      
}
}

module.exports = userController;