const { Event } = require("../models");

const eventController = {
  async getAllEvents(req, res, next) {
    res.json(await Event.findAll());
  },
};

module.exports = eventController;
