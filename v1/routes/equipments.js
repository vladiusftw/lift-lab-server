const router = require("express").Router();

const verify = require("../../verify");
const { getEquipments } = require("../controllers/equipments");

router.get("/equipments", verify, getEquipments);

module.exports = router;
