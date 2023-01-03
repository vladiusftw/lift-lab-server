const router = require("express").Router();

const { verify } = require("jsonwebtoken");
const { changePassword } = require("../controllers/put");

router.put("/change-password", verify, changePassword);

module.exports = router;
