const router = require("express").Router();

const { verify } = require("jsonwebtoken");
const { register, addUserEquipment } = require("../controllers/create");

router.post("/register", register);
router.post("/add-user-equipment", verify, addUserEquipment);

module.exports = router;
