require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(express.json());
app.use(
  cors({
    origin: process.env.url || "http:localhost:3000",
  })
);
app.use(morgan("tiny"));

const getRoutes = require("./routes/get");
const createRoutes = require("./routes/create");

app.use("/api", getRoutes);
app.use("/api", createRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
