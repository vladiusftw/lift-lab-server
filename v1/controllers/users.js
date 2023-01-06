const sql = require("../../sql");

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.data;

    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else
      sql.query(
        "select * from users where user_id=$1",
        [user_id],
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
    res.status(404).json(error.toString());
  }
};

exports.getUserEquipment = (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.data;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else
      sql.query(
        "select equipments.* from users_equipment inner join equipments on users_equipment.equipment_id=equipments.equipment_id where users_equipment.user_id=$1",
        [user_id],
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
};

exports.addUserEquipment = (req, res) => {
  try {
    const { id, equipment_id } = req.params;
    const { user_id } = req.data;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else
      sql.query(
        "insert into users_equipment values($1,$2) returning equipment_id",
        [equipment_id, user_id],
        (error, result) => {
          if (error) res.status(400).json(error);
          else res.status(201).json(result.rows[0]);
        }
      );
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.addUserExercise = (req, res) => {
  try {
    const { id, exercise_id } = req.params;
    const { user_id } = req.data;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    const { sets } = req.body;
    if (!sets) res.status(400).json("Missing inputs");
    else {
      var query = "insert into sets values";
      var array = [];
      var counter = 0;
      for (let i = 0; i < sets.length; i++) {
        query += `($${counter + 1},$${counter + 2},now(),$${counter + 3},$${
          counter + 4
        },0,'kg')`;
        if (i != sets.length - 1) query += ",";
        array.push(i + 1);
        array.push(exercise_id);
        array.push(user_id);
        array.push(sets[i]);
        counter += 4;
      }
      query +=
        " returning set_number,exercise_id,workout_date,reps,weight,weight_type";
      sql.query(query, array, (error, result) => {
        if (error) res.status(400).json(error);
        else {
          res.status(201).json(result.rows);
        }
      });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};
