const { restart } = require("nodemon");
const WilderModel = require("../models/Wilder");

module.exports = {
  // CREATE A WILDER
  create: async (req, res, next) => {
    try {
      await WilderModel.init();

      const wilder = new WilderModel(req.body);
      const result = await wilder.save();
      res.json(result);
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({ message: "Wilder déjà connu" });
      }
      throw err;
    }
  },

  // GET ALL THE WILDER
  retrieveAll: async (req, res) => {
    const result = await WilderModel.find();
    res.json(result);
  },

  // GET A WILDER

  findById: async (req, res) => {
    const result = await WilderModel.findOne(req.params.id);
    res.json(result);
  },

  // UPDATE A WILDER

  updateById: async (req, res) => {
    const result = await WilderModel.findOneAndUpdate(req.params.id);
    if (result) {
      Object.assign(result, req.body);
      await result.save();
      res.json(result);
    } else {
      res.status(404).json({ message: "On en a pas" });
    }
  },

  deleteById: async (req, res) => {
    const result = await WilderModel.deleteOne(req.params.id);
    await wilder.remove();
    res.json(result);
  },
};
