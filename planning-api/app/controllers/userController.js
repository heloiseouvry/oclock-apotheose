const bcrypt = require("bcrypt");
const { User } = require("../models");

const userController = {
  addUser: async (req, res) => {
    const newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getAllUsers: async (req, res) => {
    res.json(await User.findAll());
  },

  getAllUsersWithJob: async (req, res) => {
    res.json(await User.findAllWithJob());
  },

  getUsersWithJob: async (req, res) => {
    res.json(await User.findOneWithJob(req.params.id));
  },

  getAllUsersWithFullInfo: async (req, res) => {
    res.json(await User.findAllWithFullInfo());
  },

  getAllUsersSalary: async (req, res) => {
    try {
      const { start_date, end_date } = req.query;
      const usersSalary = await User.getAllUsersSalary(start_date, end_date);
      res.status(200).json(usersSalary);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getOneUser: async (req, res) => {
    try {
      const userById = await User.findById(req.params.id);
      res.status(201).json(userById);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getOneUserSalary: async (req, res) => {
    try {
      const { start_date, end_date } = req.query;
      const userSalary = await User.getOneUserSalary(start_date, end_date, req.user.userID);
      res.status(200).json(userSalary);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getOneUserSalary: async (req, res) => {
    try {
      const { start_date, end_date } = req.query;
      const userSalary = await User.getOneUserSalary(start_date, end_date, req.user.userID);
      res.status(200).json(userSalary);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  editUser: async (req, res) => {
    try {
      //const userToEdit = await User.findById(req.params.id);
      const userToEdit = new User(req.body);
      userToEdit.id = req.params.id;
      console.log("dans le controller : ", userToEdit);
      await userToEdit.save();
      res.status(201).json(userToEdit);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userToDelete = await User.findById(req.params.id);
      await userToDelete.delete();
      res.status(201).json({ message: "Supression effectu??e avec succ??s." });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getUsersByType: async (req, res) => {
    try {
      const users = await User.findUsersByType(req.params.type);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getAvailableUsers: async (req, res) => {
    try {
      const users = await User.findAvailableUsers("2021-07-26T14:00:00Z", "2021-07-26T16:00:00Z");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getAvailableUsersByType: async (req, res) => {
    try {
      const users = await User.findAvailableUsersByType(req.params.type, "2021-07-26T14:00:00Z", "2021-07-26T16:00:00Z");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getUserPlanning: async (req, res) => {
    try {
      const user = await User.findById(req.user.userID);
      const userPlanning = await user.findPlanning();
      res.status(200).json(userPlanning);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  matchUserJob: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      // const user_id = req.params.id;
      req.body.forEach(async (id) => {
        const userJob = await user.jobToTech(id);
      });
      console.log(req.body);

      res.status(200).json({ message: "Job - Assignement effectu?? avec succ??s." });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  removeUserJob: async (req, res) => {
    try {
      const user = await User.findById(parseInt(req.params.id));
      await user.removeAllJobsToTech();
      res.status(200).json({ message: "Job - Suppression effectu?? avec succ??s." });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = userController;
