const pool = require("../config/dbConfig");

const getTasks = async () => {
  const res = await pool.query("SELECT * FROM tasks ORDER BY id");
  return res.rows;
};

const createTask = async (description) => {
  const res = await pool.query(
    "INSERT INTO tasks (description) VALUES ($1) RETURNING *",
    [description]
  );
  return res.rows[0];
};

const updateTask = async (id, completed) => {
  const res = await pool.query(
    "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *",
    [completed, id]
  );
  return res.rows[0];
};

const deleteTask = async (id) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
