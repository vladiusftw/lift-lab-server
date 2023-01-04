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
    try {
      sql.query(
        "insert into users_equipment values($1,$2)",
        [equipment_name, email],
        (error, result) => {
          console.log("Im here");
          if (error) res.status(400).json(error);
          else res.status(201).json("User equipment added!");
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  }
};

exports.addUserExercise = (req, res) => {
  const { email, exercise_name, sets } = req.body;
  if (!email || !exercise_name || !sets) res.status(400).json("Missing Inputs");
  else {
    try {
      var query = "insert into sets values";
      var array = [];
      var counter = 0;
      for (let i = 0; i < sets.length; i++) {
        query += `($${counter + 1},$${counter + 2},now(),$${counter + 3},$${
          counter + 4
        },0)`;
        if (i != sets.length - 1) query += ",";
        array.push(i + 1);
        array.push(exercise_name);
        array.push(email);
        array.push(sets[i]);
        counter += 4;
      }
      console.log(query);
      console.log(array);
      sql.query(query, array, (error, result) => {
        if (error) res.status(400).json(error);
        else {
          res.status(201).json("Exercise added");
        }
      });
    } catch (error) {
      res.status(404).json(error);
    }
  }
};
