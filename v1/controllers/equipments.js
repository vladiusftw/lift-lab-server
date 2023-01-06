const sql = require("../../sql");

exports.getEquipments = (req, res) => {
  try {
    sql.query("select * from equipments", [], (error, result) => {
      if (error) res.status(400).json(error);
      else res.status(200).json(result.rows);
    });
  } catch (error) {
    res.status(404).json(error.toString());
  }
};
