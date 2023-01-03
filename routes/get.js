const router = require("express").Router();

const {
  getUserByEmail,
  login,
  getUserEquipment,
} = require("../controllers/get");
const verify = require("../verify");

router.get("/login", login);
router.get("/user", verify, getUserByEmail);
router.get("/user-equipment", verify, getUserEquipment);

module.exports = router;
