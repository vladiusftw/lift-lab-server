require("dotenv").config();
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const sql = require("../../sql");

exports.register = async (req, res) => {
  try {
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
      res.status(400).json("Missing inputs");
    else {
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
        "insert into users values (default,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
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
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).json("Missing inputs");
    else {
      // verify password
      sql.query(
        "select email,password,user_id from users where email=$1",
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
                console.log(result.rows[0].user_id);
                const token = jwt.sign(
                  {
                    data: {
                      user_id: result.rows[0].user_id,
                      email: result.rows[0].email,
                    },
                  },
                  process.env.TOKEN_SECRET
                );
                res.status(201).json({ token });
              } else res.status(400).json("Incorrect password"); // password does not match
            }
          }
        }
      );
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.changePassword = (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { user_id } = req.data;
    if (!id || !currentPassword || !newPassword)
      res.status(400).json("Missing inputs");
    else {
      // get the user from the db
      sql.query(
        "select password from users where user_id=$1",
        [user_id],
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
                "update users set password=$1 where user_id=$2",
                [newPasswordHash, user_id],
                (error, result) => {
                  if (error) res.status(400).json(error);
                  else res.status(201).json("Password Updated");
                }
              );
            } else res.status(400).json("Incorrect password!");
          } else res.status(400).json("User does not exist!");
        }
      );
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};
