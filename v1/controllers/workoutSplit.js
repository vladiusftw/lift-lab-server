const sql = require("../../sql");

exports.getWorkoutSplits = (req, res) => {
  try {
    sql.query("select * from workout_splits", [], (error, result) => {
      if (error) res.status(400).json(error);
      else if (result.rowCount > 0) res.status(200).json(result.rows);
      else res.status(400).json("There are currently no workout splits");
    });
  } catch (error) {
    res.status(404).json(error.toString());
  }
};
