const { Event, Phase, Address } = require("../models");

const eventController = {
  getAllEvents : async (req, res, next) => {
    res.json(await Event.findAll());
  },

  addEvent : async (req, res, next) => {
    const { title, start_date, duration, color, main, additional, zip_code, city} = req.body;
    const newAddress = new Address({main, additional, zip_code, city});
    try {
      await newAddress.save();
      const newEvent = new Event({title, start_date, duration, color, user_id: req.user.userID, address_id: newAddress.id});
      await newEvent.save();
      
      const newPhase = new Phase({
        title: newEvent.title,
        start_date: newEvent.start_date,
        duration: newEvent.duration + ' hours',
        type: 'event',
        number_fee: '0',
        event_id: newEvent.id,
        user_id: newEvent.user_id
      });
      await newPhase.save();
      
      res.status(201).json(newEvent);
    } catch (error) {
      console.error(error);
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
