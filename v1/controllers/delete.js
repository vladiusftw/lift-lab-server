const sql = require("../sql");

exports.removeUserEquipment = (req, res) => {
  const { email, equipment_name } = req.body;
  if (!email || !equipment_name) res.status(400).json("Missing inputs");
  else {
    try {
      sql.query(
        "delete from users_equipment where email=$1 and equipment_name=$2",
        [email, equipment_name],
        (error, result) => {
          if (error) res.status(400).json(error);
          else {
            sql.query(
              "delete from sets where workout_date=now()::date and email=$1",
              [email],
              (error, result) => {
                if (error) res.status(400).json(error);
                else res.status(200).json("Equipment Removed");
              }
            );
          }
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};

exports.removeUserExercise = (req, res) => {
  const { email, exercise_name } = req.body;
  if (!email || !exercise_name) res.status(400).json("Missing inputs");
  else {
    try {
      sql.query(
        "delete from sets where email=$1 and exercise_name=$2 and workout_date=now()::date returning *",
        [email, exercise_name],
        (error, result) => {
          if (error) res.status(400).json(error);
          else if (result.rowCount > 0)
            res.status(200).json("Exercise removed");
          else
            res
              .status(400)
              .json(
                `Exercise ${exercise_name} does not exist for today's workout`
              );
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};