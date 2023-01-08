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

exports.addFood = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const { food_id, diary_type, multiplier } = req.body;
      if (!food_id || !diary_type || !multiplier)
        res.status(400).json("Missing input");
      else
        sql.query(
          "insert into diary values($1,$2,now(),$3,$4) returning *",
          [food_id, user_id, diary_type, multiplier],
          (error, result) => {
            if (error) res.status(400).json(error);
            else res.status(201).json(result.rows[0]);
          }
        );
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.getDiary = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const array = [user_id];
      let query = "";
      const { date } = req.query;
      if (!date) query += "now()::date";
      else {
        query += "$2";
        array.push(new Date(date));
      }
      sql.query(
        `select ((food.carbs * 4)+(food.protein * 4)+(food.fats * 9)) as calories,diary.diary_type,diary.multiplier,food.food_name,food.carbs,food.protein,food.fats,food.measurement_type,food.measurement_value from diary inner join food on diary.food_id = food.food_id where user_id=$1 and created=${query}`,
        array,
        (error, result) => {
          if (error) res.status(400).json(error);
          else res.status(200).json(result.rows);
        }
      );
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.removeUserFood = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id, food_id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const { diary_type } = req.query;
      if (!diary_type) res.status(400).json("Missing input");
      else
        sql.query(
          "delete from diary where user_id=$1 and food_id=$2 and diary_type=$3 returning *",
          [user_id, food_id, diary_type],
          (error, result) => {
            if (error) res.status(400).json(error);
            else if (result.rowCount > 0) res.status(200).json(result.rows[0]);
            else res.status(400).json("Food does not exist");
          }
        );
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};

exports.editFood = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id, food_id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const { diary_type, multiplier } = req.body;
      if (!diary_type || !multiplier) res.status(400).json("Missing input");
      else
        sql.query(
          "update diary set multiplier=$1 where user_id=$2 and food_id=$3 and diary_type=$4 returning *",
          [multiplier, user_id, food_id, diary_type],
          (error, result) => {
            if (error) res.status(400).json(error);
            else if (result.rowCount > 0) res.status(201).json(result.rows[0]);
            else res.status(400).json("Food does not exist");
          }
        );
    }
  } catch (error) {
    res.status(400).json(error.toString());
  }
};

exports.editUserProfile = (req, res) => {
  try {
    const { user_id } = req.data;
    const { id } = req.params;
    if (user_id != id)
      res.status(400).json("Resource can't be accessed with this id");
    else {
      const {
        first_name,
        last_name,
        height,
        height_type,
        weight,
        weight_type,
        gender,
        workout_split,
        experience,
        dob,
      } = req.body;
      let query = "";
      let counter = 1;
      const array = [];
      if (
        first_name ||
        last_name ||
        height ||
        height_type ||
        weight ||
        weight_type ||
        gender ||
        workout_split ||
        experience ||
        dob
      ) {
        if (first_name) {
          query += `first_name=$${counter++}`;
          array.push(first_name);
        }
        if (last_name) {
          if (query != "") query += ",";
          query += `last_name=$${counter++}`;
          array.push(last_name);
        }
        if (height) {
          if (query != "") query += ",";
          query += `height=$${counter++}`;
          array.push(height);
        }
        if (height_type) {
          if (query != "") query += ",";
          query += `height_type=$${counter++}`;
          array.push(height_type);
        }
        if (weight) {
          if (query != "") query += ",";
          query += `weight=$${counter++}`;
          array.push(weight);
        }
        if (weight_type) {
          if (query != "") query += ",";
          query += `weight_type=$${counter++}`;
          array.push(weight_type);
        }
        if (gender) {
          if (query != "") query += ",";
          query += `gender=$${counter++}`;
          array.push(gender);
        }
        if (workout_split) {
          if (query != "") query += ",";
          query += `workout_split=$${counter++}`;
          array.push(workout_split);
        }
        if (experience) {
          if (query != "") query += ",";
          query += `experience=$${counter++}`;
          array.push(experience);
        }
        if (dob) {
          if (query != "") query += ",";
          query += `dob=$${counter++}`;
          array.push(new Date(dob));
        }
        query += ` where user_id=$${counter}`;
        array.push(user_id);
        console.log(query);
        console.log(array);
        sql.query(
          `update users set ${query} returning first_name,last_name,height,height_type,weight,weight_type,gender,workout_split,experience,dob`,
          array,
          (error, result) => {
            if (error) res.status(400).json(error);
            else if (result.rowCount > 0) res.status(201).json(result.rows[0]);
            else res.status(400).json("User not found");
          }
        );
      } else res.status(400).json("Missing input");
    }
  } catch (error) {
    res.status(404).json(error.toString());
  }
};
