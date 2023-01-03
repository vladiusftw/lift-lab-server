const bycrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).json("All input is required");
    }
    // check if user exists
    // if user exists
    // res.status(204).json("User already exists");
    const salt = await bycrypt.genSaltSync();
    const encrypted_password = await bycrypt.hash(password);
    const user = {
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encrypted_password,
    };
    // create user in db
    res.status(201).json("New user has been created");
  } catch (error) {
    res.status(404).json("An error has occured!");
  }
};
