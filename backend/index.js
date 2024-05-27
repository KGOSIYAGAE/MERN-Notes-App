import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

//Roustes
app.get("/", (req, res) => {});

//Server
app.listen(PORT, () => {
  console.log(`Sever running on: ${PORT}`);
});
