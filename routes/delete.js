const router = require("express").Router();

const { verify } = require("jsonwebtoken");
const {
  removeUserEquipment,
  removeUserExercise,
} = require("../controllers/delete");

router.delete("/remove-user-equipment", verify, removeUserEquipment);
router.delete("/remove-user-exercise", verify, removeUserExercise);

module.exports = router;
