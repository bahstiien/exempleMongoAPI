const http = require("http");
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
});
app.use(express.json());

// CREATE A WILDER
app.post("/api/wilders", wilderController.create);

// READ
app.get("/api/wilders", wilderController.retrieveAll);
app.get("/api/wilders/:id", wilderController.findById);

// UPDATE A WIDLER BY ID
app.put("/api/wilders/:id", wilderController.updateById);

// DELETE A WILDER BY ID
app.delete("/api/wilders/:id", wilderController.deleteById);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

//Start Server
app.listen(3000, () => console.log("Server started on 3000"));
