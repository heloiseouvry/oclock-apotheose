const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('../services/auth');

const authController = {
    loginSubmit: async (req, res) => {
        const { email, password, rememberme } = req.body;
        // console.log("dans le controller : ", req.body);
        const user = await User.findByEmail(email);
        // console.log("user ? ", user);
        
        if(!user) {
            return res.status(403).json("This user doesn't exist");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if(!isPasswordValid) {
            return res.status(403).json("Wrong password");
        }

        return res.status(200).json({
            token: jwt.generateToken(user, rememberme),
            // all the needed data for front
            role: user.role
        });

    },
}

module.exports = authController;
