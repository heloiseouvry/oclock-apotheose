const { Address } = require("../models");

const addressController = {
  getAllAddresses: async (req, res, next) => {
    res.json(await Address.findAll());
  },

  getAddressById: async (req, res) => {
    try {
      const addressById = await Address.findById(req.params.id);
      res.status(200).json(addressById);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  addAddress: async (req, res, next) => {
    try {
      const { main, additional, zip_code, city } = req.body;
      const newAddress = new Address({ main, additional, zip_code, city });
      await newAddress.save();
      res.status(201).json(newAddress);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  editAddress: async (req, res, next) => {
    try {
      const { main, additional, zip_code, city } = req.body;
      const addressToEdit = new Address({ main, additional, zip_code, city });
      addressToEdit.id = parseInt(req.params.id);
      await addressToEdit.save();
      res.status(200).json(addressToEdit);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const addressToDelete = await Address.findById(parseInt(req.params.id));
      await addressToDelete.delete();
      res.status(204).json({ message: "Address - Supression effectuée avec succès." });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = addressController;
