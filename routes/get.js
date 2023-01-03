const router = require("express").Router();

const { getUserById, login } = require("../controllers/get");

router.get("/login", login);
router.get("/user/:id", getUserById);

module.exports = router;
