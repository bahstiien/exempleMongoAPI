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
app.post("/api/wilder/create", wilderController.create);

// READ
app.get("/api/wilder/retrieve", wilderController.retrieveAll);
app.get("/api/wilder/retrieve/:id", wilderController.findById);

// UPDATE A WIDLER BY ID
app.put("/api/wilder/update/:id", wilderController.updateById);

// DELETE A WILDER BY ID
app.delete("/api/wilder/delete/:id", wilderController.deleteById);

//Start Server
app.listen(3000, () => console.log("Server started on 3000"));
