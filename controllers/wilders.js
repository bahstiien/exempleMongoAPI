const WilderModel = require("../models/Wilder");

module.exports = {
  // CREATE A WILDER
  create: (req, res) => {
    WilderModel.init().then(() => {
      const wilder = new WilderModel(req.body);
      wilder
        .save()
        .then((result) => {
          res.json({ success: true, result: result });
        })
        .catch((err) => {
          res.json({ success: false, result: err });
        });
    });
  },

  // GET ALL THE WILDER
  retrieveAll: async (req, res, next) => {
    await WilderModel.init();

    try {
      const result = await WilderModel.find();
      if (!result) {
        res.status(500).json({ message: "No wilder found" });
      } else {
        res.json({ success: true, result: result });
      }
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },

  // GET A WILDER

  findById: async (req, res, next) => {
    await WilderModel.init();

    try {
      const result = await WilderModel.findById({ _id: req.params.id });
      if (!result) {
        res.status(500).json({ message: "No wilder found" });
      } else {
        res.json({ success: true, result: result });
      }
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },

  // UPDATE A WILDER

  updateById: async (req, res, next) => {
    await WilderModel.init();

    try {
      const result = await WilderModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body
      );
      if (!result) {
        res.status(500).json({ message: "No wilder found" });
      } else {
        res.json({ success: true, result: result });
      }
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },

  deleteById: async (req, res, next) => {
    await WilderModel.init();

    try {
      const result = await WilderModel.deleteOne({ _id: req.params.id });
      if (!result) {
        res.status(500).json({ message: "No wilder found" });
      } else {
        res.json({ success: true, result: result });
      }
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },
};
