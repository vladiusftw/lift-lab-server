const router = require("express").Router();

const { verify } = require("jsonwebtoken");
const { removeUserEquipment } = require("../controllers/delete");

router.delete("/remove-user-equipment", verify, removeUserEquipment);

module.exports = router;
