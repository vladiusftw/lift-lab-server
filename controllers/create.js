const bycrypt = require("bcryptjs");
const sql = require("../sql");

exports.register = async (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name,
    height,
    height_type,
    weight,
    weight_type,
    age,
    gender,
    workout_split,
    experience,
  } = req.body;
  if (
    !email ||
    !password ||
    !first_name ||
    !last_name ||
    !height ||
    !height_type ||
    !weight ||
    !weight_type ||
    !age ||
    !gender ||
    !workout_split ||
    !experience
  )
    res.status(400).json("Missing inputs!");
  else {
    try {
      // check if user already exists
      sql.query(
        "select * from users where email=$1",
        [email],
        (error, result) => {
          if (error) res.status(400).json(error);
          else {
            if (result.rowCount >= 1)
              res.status(400).json("email already exists!");
          }
        }
      );
      const salt = bycrypt.genSaltSync(10);
      const hashed_password = bycrypt.hashSync(password, salt);
      sql.query(
        "insert into users values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
        [
          email,
          hashed_password,
          first_name,
          last_name,
          height,
          height_type,
          weight,
          weight_type,
          age,
          gender,
          workout_split,
          experience,
        ],
        (error) => {
          if (error) {
            res.status(400).json(error);
          } else {
            res.status(201).json("Created a new user!");
          }
        }
      );
    } catch (err) {
      res.status(404).json("An error has occured!");
    }
  }
};

exports.addUserEquipment = (req, res) => {
  const { email, equipment_name } = req.body;
  if (!email || !equipment_name) res.status(400).json("Missing Inputs!");
  else {
    sql.query(
      "insert into users_equipment values($1,$2)",
      [email, equipment_name],
      (error, result) => {
        console.log("Im here");
        if (error) res.status(400).json(error);
        else res.status(201).json("User equipment added!");
      }
    );
  }
};
