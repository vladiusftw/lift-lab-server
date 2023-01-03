const router = require("express").Router();

const { getUserByEmail, login } = require("../controllers/get");
const verify = require("../verify");

router.get("/login", login);
router.get("/user", verify, getUserByEmail);

module.exports = router;
