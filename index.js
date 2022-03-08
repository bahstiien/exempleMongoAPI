const express = require("express");
const mongoose = require("mongoose");
const WilderModel = require("./models/Wilder");
const wilderController = require("./controllers/wilders");

const app = express();

// database
mongoose
  .connect(
    "mongodb://root:root@localhost:27017/wilderdb?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    { autoIndex: true }
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.get("/", (req, res, next) => {
  res.send("Hello World");

  WilderModel.init().then(() => {
    const firstWilder = new WilderModel({
      name: "First Wilder",
      city: "San Francisco",
      skills: [
        { title: "HTML", votes: 10 },
        { title: "React", votes: 5 },
      ],
    });
    firstWilder
      .save()
      .then((result) => {
        console.log("success:", result);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  });
});
app.use(express.json());
app.post("/api/wilder/create", wilderController.create);
app.get("/api/wilder/retrieve", wilderController.retrieve);
app.post("/api/wilder/update", wilderController.update);
app.delete("/api/wilder/delete", wilderController.delete);
//Start Server
app.listen(3000, () => console.log("Server started on 3000"));
