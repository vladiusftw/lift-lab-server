const bycrypt = require("bcryptjs");
const sql = require("../sql");
exports.changePassword = (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  if (!email || !currentPassword || !newPassword)
    res.status(400).json("Missing Inputs!");
  else {
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
  }
};