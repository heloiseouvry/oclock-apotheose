const { Event, Phase } = require("../models");

const eventController = {
  getAllEvents : async (req, res, next) => {
    res.json(await Event.findAll());
  },

  addEvent : async (req, res, next) => {
    const { title, start_date, end_date, color, address_id} = req.body;
    try {
      const newEvent = new Event({title, start_date, end_date, color, user_id: req.user.userID, address_id});
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },


  editEvent : async (req, res, next) => {
    try {
      const { title, start_date, end_date, color, address_id} = req.body;

      const eventToEdit = new Event({title, start_date, end_date, color, user_id: req.user.userID, address_id});
      eventToEdit.id = parseInt(req.params.id);
      await eventToEdit.save();
      res.status(200).json(await Phase.findEventPhaseByEventId(eventToEdit.id));
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  deleteEvent : async (req, res) => {
    try {
        const eventToDelete = await Event.findById(parseInt(req.params.id));
        await eventToDelete.delete()
        res.status(204).json({message : "Event - Supression effectuée avec succès."})
    } catch (error) {
        res.status(500).json(error.message);
    }
  },

  getOneEvent : async (req, res) => {
    try {
        const eventById = await Event.findById(req.params.id);
        res.status(201).json(eventById);
    } catch (error) {
        res.status(500).json(error.message);
    }
}
};

module.exports = eventController;
