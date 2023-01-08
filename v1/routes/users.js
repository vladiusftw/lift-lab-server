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
  addFood,
  getDiary,
  removeUserFood,
  editFood,
  editUserProfile,
} = require("../controllers/users");

// gets
router.get("/users/:id", verify, getUserById);
router.get("/users/:id/equipments", verify, getUserEquipment);
router.get("/users/:id/workout", verify, getUserExercises);
router.get("/users/:id/exercises", verify, getUserAvailableExercises);
router.get("/users/:id/exercises/:exercise_id/pr", verify, getUserPR);
router.get("/users/:id/diary", verify, getDiary);

// posts
router.post("/users/:id/equipments", verify, addUserEquipment);
router.post("/users/:id/exercises", verify, addUserExercise);
router.post("/users/:id/foods", verify, addFood);

// put
router.put("/users/:id/exercises/:exercise_id", verify, replaceExercise);
router.put(
  "/users/:id/exercises/:exercise_id/sets/:set_number",
  verify,
  logSet
);
router.put("/users/:id/foods/:food_id", verify, editFood);
router.put("/users/:id", verify, editUserProfile);

// delete
router.delete(
  "/users/:id/equipments/:equipment_id",
  verify,
  removeUserEquipment
);
router.delete("/users/:id/exercises/:exercise_id", verify, removeUserExercise);
router.delete("/users/:id/foods/:food_id", verify, removeUserFood);

module.exports = router;
