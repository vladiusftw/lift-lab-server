const sql = require("../../sql");

exports.createFood = (req, res) => {
  try {
    const {
      food_name,
      carbs,
      protein,
      fats,
      measurement_type,
      measurement_value,
    } = req.body;
    if (
      !food_name ||
      !carbs ||
      !protein ||
      !fats ||
      !measurement_type ||
      !measurement_value
    )
      res.status(400).json("Missing input");
    else {
      sql.query(
        "insert into food values(default,$1,$2,$3,$4,$5,$6) returning *",
        [food_name, carbs, protein, fats, measurement_type, measurement_value],
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

exports.getFoods = (req, res) => {
  try {
    const { food_name } = req.query;
    const name = food_name ? food_name : "";
    sql.query(
      "select * from food where food_name ilike $1",
      [`%${name}%`],
      (error, result) => {
        if (error) res.status(400).json(error);
        else if (result.rowCount > 0) res.status(200).json(result.rows);
        else res.status(400).json("No foods with given input");
      }
    );
  } catch (error) {
    res.status(400).json(error.toString());
  }
};
