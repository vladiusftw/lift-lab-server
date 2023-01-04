const router = require("express").Router();

const {
  getUserByEmail,
  login,
  getUserEquipment,
  getEquipments,
  getUserExercises,
  getUserAvailableExercises,
} = require("../controllers/get");
const verify = require("../verify");

router.get("/login", login);
router.get("/user", verify, getUserByEmail);
router.get("/user-equipment", verify, getUserEquipment);
router.get("/equipments", verify, getEquipments);
router.get("/user-exercises", verify, getUserExercises);
router.get("/user-available-exercises", verify, getUserAvailableExercises);

module.exports = router;
