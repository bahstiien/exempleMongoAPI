const express = require("express");
const mongoose = require("mongoose");
const WilderModel = require("./models/Wilder");
const wilderController = require("./controllers/wilders");
const cors = require("cors");

const app = express();
app.use(cors());

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
});
app.use(express.json());

function runAsyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
}

// CREATE A WILDER
app.post("/api/wilders", runAsyncWrapper(wilderController.create));

// READ
app.get("/api/wilders", runAsyncWrapper(wilderController.retrieveAll));
app.get("/api/wilders/:id", runAsyncWrapper(wilderController.findById));

// UPDATE A WIDLER BY ID
app.put("/api/wilders/:id", wilderController.updateById);

// DELETE A WILDER BY ID
app.delete("/api/wilders/:id", wilderController.deleteById);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "A problem !" });
});

app.use((req, res, next) => {
  res.status(404).json("Sorry can't find that!");
});

//Start Server
app.listen(3001, () => console.log("Server started on 3001"));

// Finish
