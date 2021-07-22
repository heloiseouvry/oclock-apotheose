const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('../services/auth');

const authController = {
    loginSubmit: async (req, res) => {
        // s'authentifier
        const email = req.body.email;
        const password = req.body.password;
        
        const user = await User.findByEmail(email);
        
        if(!user) {
            // l'utilisateur n'existe pas
            return res.status(403).json("This user doesn't exist");
        }

        // si on arrive jusqu'ici c'est que l'utilisateur existe
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if(!isPasswordValid) {
            // si le mot de passe ne correspond pas a celui qui à été encrypté en BDD alors on reaffiche la page de login avec une erreur
            return res.status(403).json("Wrong password");
        }
        
        // si on arrive jusqu'ici c'est que l'utilisateur existe (trouvé grace a l'email) et le mot de passe correspond a ce qui est en BDD
        // req.session.user = user;
        // req.session.user.password = null;

        res.status(200).json({
            token: jwt.generateToken(user),
            // all the needed data for front
            role: user.role
        });

    },
}

module.exports = authController;
