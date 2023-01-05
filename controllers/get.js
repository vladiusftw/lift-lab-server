require("dotenv").config();
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const sql = require("../sql");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) res.status(400).json("Missing inputs");
  else {
    try {
      // verify password
      sql.query(
        "select email,password from users where email=$1",
        [email],
        (error, result) => {
          if (error) res.status(400).json(error);
          else {
            if (result.rowCount == 0)
              res.status(400).json("User does not exist");
            else {
              // user exists
              const hashed_password = result.rows[0].password;
              if (bycrypt.compareSync(password, hashed_password)) {
                // password matches
                // create a jwt token
                const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
                res.status(200).json({ token });
              } else res.status(400).json("Incorrect password"); // password does not match
            }
          }
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) res.status(400).json("Missing inputs");
  else {
    try {
      sql.query(
        "select * from users where email=$1",
        [email],
        (error, result) => {
          if (error) res.status(400).json(error);
          else if (result.rowCount >= 1) {
            const user = result.rows[0];
            delete user.password;
            res.status(200).json(user);
          } else res.status(400).json("User does not exist");
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};

exports.getUserEquipment = (req, res) => {
  const { email } = req.body;
  if (!email) res.status(400).json("Missing inputs");
  else {
    try {
      sql.query(
        "select equipments.* from users_equipment inner join equipments on users_equipment.equipment_name=equipments.equipment_name where email=$1",
        [email],
        (error, result) => {
          if (error) res.status(400).json(error);
          else {
            res.status(200).json(result.rows);
          }
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};

exports.getEquipments = (req, res) => {
  try {
    sql.query("select * from equipments", [], (error, result) => {
      if (error) res.status(400).json(error);
      else res.status(200).json(result.rows);
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

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
