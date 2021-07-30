const { Phase, Event } = require("../models");

const phaseController = {
  getAllPhases: async (req, res, next) => {
    res.status(200).json(await Phase.findAll());
  },

  getAllPhasesWithUsersAndSalary: async (req, res) => {
    try {
      res.status(200).json(await Phase.findAllWithUsersAndSalary());
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  addPhase: async (req, res) => {
    const { title, start_date, end_date, type, number_fee, event_id, tech_manager_contact, provider_contact, internal_location, comments } = req.body;
    const user_id = req.body.user_id ? req.body.user_id : req.user.userID;
    let newPhase;
    if(type==="event"){
      newPhase = new Phase({ title, start_date, end_date, type, number_fee, event_id, user_id });
    } else {
      newPhase = new Phase({ title, start_date, end_date, type, number_fee, event_id, user_id, tech_manager_contact, provider_contact, internal_location, comments });
    }
    try {
      await newPhase.save();
      res.status(201).json(newPhase);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getOnePhase: async (req, res) => {
    try {
      const phaseById = await Phase.findById(req.params.id);
      res.status(200).json(phaseById);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  deletePhase: async (req, res) => {
    try {
      const phaseToDelete = await Phase.findById(req.params.id);
      if (phaseToDelete.type === "event") {
        const eventToDelete = await Event.findById(phaseToDelete.event_id);
        await phaseToDelete.delete();
        await eventToDelete.delete();
      } else {
        await phaseToDelete.delete();
      }
      res.status(204).json({ message: "Phase - Supression effectuée avec succès." });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  editPhase: async (req, res) => {
    try {
      const { title, start_date, end_date, type, number_fee, event_id, user_id } = req.body;
      const phaseToEdit = new Phase({ title, start_date, end_date, type, number_fee, event_id, user_id });
      phaseToEdit.id = parseInt(req.params.id);
      console.log("dans le controller : ", phaseToEdit);
      await phaseToEdit.save();
      res.status(200).json(phaseToEdit);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  assignTech: async (req, res) => {
    try {
      const phase = await Phase.findById(req.params.id);
      const { tech_id, salary } = req.body;
      
      phase.assignTech(tech_id, salary);
      res.status(200).json({ message: "Phase - Assignement effectué avec succès." });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  techsInfo: async (req, res) => {
    try {
      const phase = await Phase.findById(req.params.id);
      const techsInfo = await phase.getTechsInfo();
      res.status(200).json(techsInfo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = phaseController;
