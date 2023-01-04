const router = require("express").Router();

const {
  getUserByEmail,
  login,
  getUserEquipment,
  getEquipments,
} = require("../controllers/get");
const verify = require("../verify");

router.get("/login", login);
router.get("/user", verify, getUserByEmail);
router.get("/user-equipment", verify, getUserEquipment);
router.get("/equipments", verify, getEquipments);

module.exports = router;
