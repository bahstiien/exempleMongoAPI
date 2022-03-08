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
  retrieve: async (req, res, next) => {
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

  update: async (req, res, next) => {
    await WilderModel.init();

    try {
      const result = await WilderModel.findOneAndUpdate(
        {
          name: req.body.name,
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

  delete: async (req, res, next) => {
    await WilderModel.init();

    try {
      const result = await WilderModel.deleteOne({ _id: req.body._id });
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
