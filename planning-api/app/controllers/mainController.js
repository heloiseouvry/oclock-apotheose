const { User } = require('../models');

const mainController = {
    loginSubmit: async (req, res) => {
        // s'authentifier

        const email = req.body.email;
        const password = req.body.password;

        
        const user = await User.findBy({
            where: {
                email: email
            }
        })
        
        if(!user) {
            // l'utilisateur n'éxiste pas
            return res.json({
                error: "Cet utilisateur n'éxiste pas !"
            });
        }

        // si on arrive jusqu'ici c'est que l'utilisateur existe
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if(!isPasswordValid) {
            // si le mot de passe ne correspond pas a celui qui à été encrypté en BDD alors on reaffiche la page de login avec une erreur
            return res.json({
                error: "Le mot de passe est incorrect !"
            });
        }
        
        // si on arrive jusqu'ici c'est que l'utilisateur existe (trouvé grace a l'email) et le mot de passe correspond a ce qui est en BDD
        // on enregistre l'utilisateur dans la session
        req.session.user = user;
        // je supprimer la propriété "password" de l'utilisateur stocké en session par securité
        req.session.user.password = null;

        res.json(user);


    },
}
