require("dotenv").config();
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const sql = require("../sql");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) res.status(400).json("Missing inputs!");
  else {
    // verify password
    sql.query(
      "select email,password from users where email=$1",
      [email],
      (error, result) => {
        if (error) res.status(400).json(error);
        else {
          if (result.rowCount == 0) res.status(400).json("User does not exist");
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
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) res.status(400).json("Missing inputs!");
  else {
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
  }
};

exports.getUserEquipment = (req, res) => {
  const { email } = req.body;
  if (!email) res.status(400).json("Missing Inputs!");
  else {
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
  }
};
