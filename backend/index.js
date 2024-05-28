const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

//Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

//Roustes
app.get("/", (req, res) => {
  res.json({ data: "Hellow" });
});

//DB connection and server initiation
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("db connected!!");

    //Server
    app.listen(PORT, () => {
      console.log(`Sever running on: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log({ error: error.message });
  });
