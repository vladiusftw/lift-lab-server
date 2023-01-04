const sql = require("../sql");

exports.removeUserEquipment = (req, res) => {
  const { email, equipment_name } = req.body;
  if (!email || !equipment_name) res.status(400).json("Missing Inputs!");
  else {
    sql.query(
      "delete from users_equipment where email=$1 and equipment_name=$2",
      [email, equipment_name],
      (error, result) => {
        if (error) res.status(400).json(error);
        else res.status(200).json("Equipment removed!");
      }
    );
  }
};
