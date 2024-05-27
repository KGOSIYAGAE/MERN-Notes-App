import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT;

//Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

//Roustes
app.get("/", (req, res) => {
  res.json({ data: "Hellow" });
});

//Server
app.listen(PORT, () => {
  console.log(`Sever running on: ${PORT}`);
});
