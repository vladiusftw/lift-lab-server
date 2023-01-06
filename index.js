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

const authRoutes = require("./v1/routes/auth");
const usersRoutes = require("./v1/routes/users");
const equipmentsRoutes = require("./v1/routes/equipments");
const workoutSplitsRoutes = require("./v1/routes/workoutSplits");

app.use("/api/v1", authRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", equipmentsRoutes);
app.use("/api/v1", workoutSplitsRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
