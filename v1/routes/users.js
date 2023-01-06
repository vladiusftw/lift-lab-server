const router = require("express").Router();

const verify = require("../../verify");
const {
  getUserById,
  getUserEquipment,
  addUserEquipment,
  addUserExercise,
} = require("../controllers/users");

router.get("/users/:id", verify, getUserById);
router.get("/users/:id/equipments", verify, getUserEquipment);
router.post("/users/:id/equipments/:equipment_id", verify, addUserEquipment);
router.post("/users/:id/exercises/:exercise_id", verify, addUserExercise);

module.exports = router;
