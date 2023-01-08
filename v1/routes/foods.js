const router = require("express").Router();

const { createFood, getFoods } = require("../controllers/foods");
const verify = require("../../verify");

// get
router.get("/foods", verify, getFoods);

// post
router.post("/foods", verify, createFood);

module.exports = router;
