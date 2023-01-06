const router = require("express").Router();

const verify = require("../../verify");
const { getWorkoutSplits } = require("../controllers/workoutSplit");

router.get("/workout-splits", verify, getWorkoutSplits);

module.exports = router;
