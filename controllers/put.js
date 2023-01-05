const bycrypt = require("bcryptjs");
const sql = require("../sql");

exports.changePassword = (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  if (!email || !currentPassword || !newPassword)
    res.status(400).json("Missing inputs");
  else {
    try {
      // get the user from the db
      sql.query(
        "select email,password from users where email=$1",
        [email],
        (error, result) => {
          if (error) res.status(400).json(error);
          else if (result.rowCount >= 1) {
            const user = result.rows[0];
            // check if password matches
            if (bycrypt.compareSync(currentPassword, user.password)) {
              // password matches
              // hash the new password
              const salt = bycrypt.genSaltSync(10);
              const newPasswordHash = bycrypt.hashSync(newPassword, salt);
              sql.query(
                "update users set password=$1 where email=$2",
                [newPasswordHash, email],
                (error, result) => {
                  if (error) res.status(400).json(error);
                  else res.status(201).json("Password Updated");
                }
              );
            } else res.status(400).json("Incorrect password!");
          } else res.status(400).json("User does not exist!");
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};

exports.replaceExercise = (req, res) => {
  const { email, exercise_name, target } = req.body;
  if (!email || !exercise_name || !target)
    res.status(400).json("Missing inputs");
  else {
    try {
      // get available exercises in which it can be replaced with the current one
      sql.query(
        "select * from users_equipment inner join equipments on users_equipment.equipment_name=equipments.equipment_name inner join exercises_equipments on equipments.equipment_name=exercises_equipments.equipment_name inner join exercises on exercises_equipments.exercise_name=exercises.exercise_name where users_equipment.email=$1 and exercises.exercise_name!=$2 and exercises.target=$3",
        [email, exercise_name, target],
        (error, result) => {
          if (error) res.status(400).json(error);
          else if (result.rowCount >= 1) {
            const max = result.rows.length - 1;
            const min = 0;
            const randIndex = Math.floor(Math.random() * (max - min + 1)) + min;
            sql.query(
              "update sets set exercise_name=$1,weight=$2 where email=$3 and exercise_name=$4 and workout_date=now()::date returning *",
              [result.rows[randIndex].exercise_name, 0, email, exercise_name],
              (error, result) => {
                if (error) res.status(400).json(error);
                else if (result.rowCount > 0) res.status(201).json(result.rows);
                else res.status(400).json(`No exercise ${exercise_name} today`);
              }
            );
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

exports.logSet = (req, res) => {
  const { email, exercise_name, set_number, weight, weight_type } = req.body;
  if (!email || !exercise_name || !set_number || !weight || !weight_type)
    res.status(400).json("Missing inputs");
  else {
    try {
      sql.query(
        "update sets set weight=$1,weight_type=$2 where email=$3 and exercise_name=$4 and set_number=$5 and workout_date=now()::date returning *",
        [weight, weight_type, email, exercise_name, set_number],
        (error, result) => {
          if (error) res.status(400).json(error);
          else if (result.rowCount > 0) res.status(200).json(result.rows);
          else
            res
              .status(400)
              .json("Exercise with the given inputs does not exist");
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};
