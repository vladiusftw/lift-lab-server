require("dotenv").config();
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const sql = require("../sql");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) res.status(400).json("Missing inputs!");
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
              } else res.status(400).json("Incorrect password!"); // password does not match
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
  if (!email) res.status(400).json("Missing inputs!");
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
          } else res.status(400).json("User does not exist!");
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};

exports.getUserEquipment = (req, res) => {
  const { email } = req.body;
  if (!email) res.status(400).json("Missing Inputs!");
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
  if (!email || !workout_date) res.status(400).json("Missing inputs!");
  else {
    try {
    } catch (error) {
      res.status(404).json(error);
    }
  }
};
