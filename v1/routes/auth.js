const router = require("express").Router();

const verify = require("../../verify");
const { register, login, changePassword } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.put("/reset-password", verify, changePassword);

module.exports = router;
