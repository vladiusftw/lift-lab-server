require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: process.env.url || "http:localhost:3000",
  })
);

const getRoutes = require("./routes/get");

app.use("/api", getRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
