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
      
    },

    getAllUsers : async (req, res) => {
        res.json(await User.findAll());
    },

    getAllUsersWithJob : async (req, res) => {
        res.json(await User.findAllWithJob());
    },

    getOneUser : async (req, res) => {
        try {
            const userById = await User.findById(req.params.id);
            res.status(201).json(userById);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    editUser : async (req, res) => {
        try {
            //const userToEdit = await User.findById(req.params.id);
            const userToEdit = new User(req.body);
            userToEdit.id = req.params.id
            console.log("dans le controller : ",userToEdit);
            await userToEdit.save();
            res.status(201).json(userToEdit);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    deleteUser : async (req, res) => {
        try {
            const userToDelete = await User.findById(req.params.id);
            await userToDelete.delete()
            res.status(201).json({message : "Supression effectuée avec succès."})
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getUsersByType : async (req, res) => {
        try {
            const users = await User.findUsersByType(req.params.type);
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getAvailableUsers : async (req, res) => {
        try {
            const users = await User.findAvailableUsers('2021-07-26T14:00:00Z', '2021-07-26T16:00:00Z');
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getAvailableUsersByType : async (req, res) => {
        try {
            const users = await User.findAvailableUsersByType(req.params.type, '2021-07-26T14:00:00Z', '2021-07-26T16:00:00Z');
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getUserPlanning : async (req, res) => {
        try {
            const user = await User.findById(req.user.userID);
            const userPlanning = await user.findPlanning();
            res.status(200).json(userPlanning)
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

}

module.exports = userController;