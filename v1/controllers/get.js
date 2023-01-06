const sql = require("../sql");

exports.getUserExercises = (req, res) => {
  const { email, workout_date } = req.body;
  if (!email || !workout_date) res.status(400).json("Missing inputs");
  else {
    try {
      sql.query(
        "select sets.set_number,sets.exercise_name,sets.workout_date,sets.reps,sets.weight,sets.weight_type,exercises.target,exercises.gif from sets inner join exercises on sets.exercise_name=exercises.exercise_name where sets.email=$1 and sets.workout_date=$2 order by sets.set_number asc",
        [email, new Date(workout_date)],
        (error, result) => {
          if (error) res.status(400).json(error);
          else res.status(200).json(result.rows);
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};

exports.getUserAvailableExercises = (req, res) => {
  const { email, target } = req.body;
  if (!email || !target) res.status(400).json("Missing inputs");
  else {
    try {
      sql.query(
        "select exercises.* from users_equipment inner join equipments on users_equipment.equipment_name=equipments.equipment_name inner join exercises_equipments on equipments.equipment_name=exercises_equipments.equipment_name inner join exercises on exercises_equipments.exercise_name=exercises.exercise_name where users_equipment.email=$1 and exercises.target=$2",
        [email, target],
        (error, result) => {
          if (error) res.status(400).json(error);
          else if (result.rowCount >= 1) {
            res.status(200).json(result.rows);
          } else
            res
              .status(400)
              .json(
                "There are no other exercises that can be done with your available equipment"
              );
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};

exports.getUserPR = (req, res) => {
  const { email, exercise_name } = req.body;
  if (!email || !exercise_name) res.status(400).json("Missing inputs");
  else {
    try {
      sql.query(
        "select exercise_name,workout_date,reps,weight,weight_type from sets where email=$1 and exercise_name=$2 order by weight desc limit 3",
        [email, exercise_name],
        (error, result) => {
          if (error) res.status(400).json(error);
          else if (result.rowCount >= 1) res.status(200).json(result.rows);
          else res.status(400).json("No Previous PR for this exercise");
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};
