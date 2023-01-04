const router = require("express").Router();

const { verify } = require("jsonwebtoken");
const {
  register,
  addUserEquipment,
  addUserExercise,
} = require("../controllers/create");

router.post("/register", register);
router.post("/add-user-equipment", verify, addUserEquipment);
router.post("/add-user-exercise", verify, addUserExercise);

module.exports = router;
