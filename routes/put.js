const router = require("express").Router();
const { verify } = require("jsonwebtoken");

const { changePassword, replaceExercise } = require("../controllers/put");

router.put("/change-password", verify, changePassword);
router.put("/replace-exercise", verify, replaceExercise);

module.exports = router;
