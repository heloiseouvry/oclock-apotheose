const { Phase, Event } = require("../models");

const phaseController = {
  getAllPhases: async (req, res, next) => {
    res.json(await Phase.findAll());
  },

  addPhase: async (req, res) => {
    const newPhase = new Phase(req.body);
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
      res.status(201).json(phaseById);
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
      const phaseToEdit = new Phase(req.body);
      phaseToEdit.id = req.params.id;
      console.log("dans le controller : ", phaseToEdit);
      await phaseToEdit.save();
      res.status(200).json(phaseToEdit);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = phaseController;
