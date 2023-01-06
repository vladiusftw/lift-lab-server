const router = require("express").Router();

const verify = require("../../verify");
const {
  getUserById,
  getUserEquipment,
  addUserEquipment,
  addUserExercise,
  getUserExercises,
  getUserAvailableExercises,
  getUserPR,
  replaceExercise,
  logSet,
  removeUserEquipment,
  removeUserExercise,
} = require("../controllers/users");

// gets
router.get("/users/:id", verify, getUserById);
router.get("/users/:id/equipments", verify, getUserEquipment);
router.get("/users/:id/workout", verify, getUserExercises);
router.get("/users/:id/exercises", verify, getUserAvailableExercises);
router.get("/users/:id/exercises/:exercise_id/pr", verify, getUserPR);

// posts
router.post("/users/:id/equipments", verify, addUserEquipment);
router.post("/users/:id/exercises", verify, addUserExercise);

// put
router.put("/users/:id/exercises/:exercise_id", verify, replaceExercise);
router.put(
  "/users/:id/exercises/:exercise_id/sets/:set_number",
  verify,
  logSet
);

// delete
router.delete(
  "/users/:id/equipments/:equipment_id",
  verify,
  removeUserEquipment
);
router.delete("/users/:id/exercises/:exercise_id", verify, removeUserExercise);

module.exports = router;
