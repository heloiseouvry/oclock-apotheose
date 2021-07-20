const { Event } = require("../models");

const eventController = {
  async getAllEvents(req, res, next) {
    console.log("All events : ", await Event.findAll());
  },
};

module.exports = eventController;
