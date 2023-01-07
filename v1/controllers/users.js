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
          else if (result.rowCount > 0) {
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
          else if (result.rowCount > 0) {
            res.status(200).json(result.rows);
          } else res.status(400).json("User does not have any equipment");
        }
      );
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.addUserEquipment = (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.data;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const { equipment_id } = req.body;
      if (!equipment_id) res.status(400).json("Missing input");
      else
        sql.query(
          "insert into users_equipment values($1,$2) returning equipment_id",
          [equipment_id, user_id],
          (error, result) => {
            if (error) res.status(400).json(error);
            else res.status(201).json(result.rows);
          }
        );
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.addUserExercise = (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.data;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const { exercise_id, sets } = req.body;
      if (!exercise_id || !sets) res.status(400).json("Missing inputs");
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
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.getUserExercises = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const { workout_date } = req.query;
      if (user_id != id)
        res.status(400).json("Resource can't be accessed with this id");
      else {
        const date = workout_date ? new Date(workout_date) : new Date();
        sql.query(
          "select sets.set_number,exercises.exercise_name,sets.workout_date,sets.reps,sets.weight,sets.weight_type,exercises.target,exercises.gif from sets inner join exercises on sets.exercise_id=exercises.exercise_id where sets.user_id=$1 and sets.workout_date=$2 order by sets.set_number asc",
          [user_id, date],
          (error, result) => {
            if (error) res.status(400).json(error);
            else if (result.rowCount > 0) res.status(200).json(result.rows);
            else res.status(400).json("No exercises found");
          }
        );
      }
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.getUserAvailableExercises = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const { target } = req.query;
      if (!target) res.status(400).json("Missing input");
      else
        sql.query(
          "select exercises.* from users_equipment inner join equipments on users_equipment.equipment_id=equipments.equipment_id inner join exercises_equipments on equipments.equipment_id=exercises_equipments.equipment_id inner join exercises on exercises_equipments.exercise_id=exercises.exercise_id where users_equipment.user_id=$1 and exercises.target=$2",
          [user_id, target],
          (error, result) => {
            if (error) res.status(400).json(error);
            else if (result.rowCount > 0) {
              res.status(200).json(result.rows);
            } else
              res
                .status(400)
                .json(
                  "There are no other exercises that can be done with your available equipment"
                );
          }
        );
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.getUserPR = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id, exercise_id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      sql.query(
        "select exercise_id,workout_date,reps,weight,weight_type from sets where user_id=$1 and exercise_id=$2 order by weight desc limit 3",
        [user_id, exercise_id],
        (error, result) => {
          if (error) res.status(400).json(error);
          else if (result.rowCount > 0) res.status(200).json(result.rows);
          else res.status(400).json("No Previous PR for this exercise");
        }
      );
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.replaceExercise = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id, exercise_id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const { target } = req.query;
      if (!target) res.status(400).json("Missing input");
      // get available exercises in which it can be replaced with the current one
      else
        sql.query(
          "select * from users_equipment inner join equipments on users_equipment.equipment_id=equipments.equipment_id inner join exercises_equipments on equipments.equipment_id=exercises_equipments.equipment_id inner join exercises on exercises_equipments.exercise_id=exercises.exercise_id where users_equipment.user_id=$1 and exercises.exercise_id!=$2 and exercises.target=$3",
          [user_id, exercise_id, target],
          (error, result) => {
            if (error) res.status(400).json(error);
            else if (result.rowCount > 0) {
              const max = result.rows.length - 1;
              const min = 0;
              const randIndex =
                Math.floor(Math.random() * (max - min + 1)) + min;
              sql.query(
                "update sets set exercise_id=$1,weight=$2 where user_id=$3 and exercise_id=$4 and workout_date=now()::date returning *",
                [result.rows[randIndex].exercise_id, 0, user_id, exercise_id],
                (error, result) => {
                  if (error) res.status(400).json(error);
                  else if (result.rowCount > 0)
                    res.status(201).json(result.rows);
                  else res.status(400).json(`No exercise ${exercise_id} today`);
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
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.logSet = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id, exercise_id, set_number } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const { weight, weight_type } = req.query;
      if (!weight || !weight_type) res.status(400).json("Missing inputs");
      else {
        sql.query(
          "update sets set weight=$1,weight_type=$2 where user_id=$3 and exercise_id=$4 and set_number=$5 and workout_date=now()::date returning *",
          [weight, weight_type, user_id, exercise_id, set_number],
          (error, result) => {
            if (error) res.status(400).json(error);
            else if (result.rowCount > 0) res.status(200).json(result.rows);
            else
              res
                .status(400)
                .json("Exercise with the given inputs does not exist");
          }
        );
      }
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.removeUserEquipment = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id, equipment_id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      sql.query(
        "delete from users_equipment where user_id=$1 and equipment_id=$2 returning *",
        [user_id, equipment_id],
        (error, result) => {
          if (error) res.status(400).json(error);
          else if (result.rowCount > 0) {
            sql.query(
              "delete from sets where workout_date=now()::date and user_id=$1",
              [user_id],
              (error, result) => {
                if (error) res.status(400).json(error);
                else res.status(200).json("Equipment Removed");
              }
            );
          } else res.status(400).json("Equipment does not exist");
        }
      );
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.removeUserExercise = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id, exercise_id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      sql.query(
        "delete from sets where user_id=$1 and exercise_id=$2 and workout_date=now()::date returning *",
        [user_id, exercise_id],
        (error, result) => {
          if (error) res.status(400).json(error);
          else if (result.rowCount > 0)
            res.status(200).json("Exercise removed");
          else
            res
              .status(400)
              .json(
                `Exercise ${exercise_id} does not exist for today's workout`
              );
        }
      );
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};
