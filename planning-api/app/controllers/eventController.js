const { Event, Phase } = require("../models");

const eventController = {
  getAllEvents : async (req, res, next) => {
    res.json(await Event.findAll());
  },

  addEvent : async (req, res, next) => {
    const newEvent = new Event(req.body);
    console.log(newEvent);
    try {
      await newEvent.save();
      
      const newPhase = new Phase({
        title: newEvent.title,
        start_date: newEvent.start_date,
        duration: newEvent.duration,
        type: 'event',
        number_fee: '0',
        event_id: newEvent.id,
        user_id: newEvent.user_id
      });
      await newPhase.save();
      
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },


  editEvent : async (req, res, next) => {
    try {
      const eventToEdit = new Event(req.body);
      eventToEdit.id = req.params.id;
      await eventToEdit.save();
      res.status(201).json(eventToEdit);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  deleteEvent : async (req, res) => {
    try {
        const eventToDelete = await Event.findById(req.params.id);
        await eventToDelete.delete()
        res.status(201).json({message : "Supression effectuée avec succès."})
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
