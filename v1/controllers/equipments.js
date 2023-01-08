const sql = require("../../sql");

exports.getEquipments = (req, res) => {
  try {
    const { equipment_name } = req.query;
    const name = equipment_name ? equipment_name : "";
    sql.query(
      `select * from equipments where equipment_name ilike $1`,
      [`%${name}%`],
      (error, result) => {
        if (error) res.status(400).json(error);
        else res.status(200).json(result.rows);
      }
    );
  } catch (error) {
    res.status(404).json(error.toString());
  }
};
