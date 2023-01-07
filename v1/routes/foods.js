const router = require("express").Router();

const { createFood } = require("../controllers/foods");
const verify = require("../../verify");

router.post("/foods", verify, createFood);

module.exports = router;
