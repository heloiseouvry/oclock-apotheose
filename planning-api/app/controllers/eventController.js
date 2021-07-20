const { Event } = require("../models");

const eventController = {
  async getAllEvents(req, res, next) {
    res.json(await Event.findAll());
  },

  async addEvent(req, res, next){
    const newEvent = new Event(req.body);
    try {
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },


  async editEvent(req, res, next){
    try {
      const eventToEdit = await Event.findById(req.params.id);
      await eventToEdit.save();
      res.status(201).json(eventToEdit);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

module.exports = eventController;
