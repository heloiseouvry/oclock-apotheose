const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('../services/auth');

const authController = {
    loginSubmit: async (req, res) => {
        const { email, password } = req.body;
        
        const user = await User.findByEmail(email);
        
        if(!user) {
            return res.status(403).json("This user doesn't exist");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if(!isPasswordValid) {
            return res.status(403).json("Wrong password");
        }

        return res.status(200).json({
            token: jwt.generateToken(user),
            // all the needed data for front
            role: user.role
        });

    },
}

module.exports = authController;
