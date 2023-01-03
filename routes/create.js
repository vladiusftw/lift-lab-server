const router = require("express").Router();

const { register } = require("../controllers/create");

router.post("/register", register);

module.exports = router;
