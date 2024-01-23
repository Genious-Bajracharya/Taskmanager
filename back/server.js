const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the Node.js backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mAsenko88",
  database: "tasks",
});

app.get("/showorder", (req, res) => {
  const query = "select count(DISTINCT created_at) from orders";
  con.query(query, ["admin"], (error, results) => {
    if (error) {
      console.error("Error fetching users: ", error.message);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

app.get("/orders", (req, res) => {
  const query = "SELECT * FROM tasks  ORDER BY status DESC,Task_priority DESC;";
  con.query(query, ["admin"], (error, results) => {
    if (error) {
      console.error("Error fetching users: ", error.message);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

app.post("/status", (req, res) => {
  const TaskName = req.body.TaskName;
  const query = "UPDATE tasks SET status = ? WHERE Task_Name = ?";
  con.query(query, ["Completed", TaskName], (err, result) => {
    if (err) throw err;
    res.json({ message: "Task  updated successfully" });
  });
});

app.post("/remove", (req, res) => {
  const TaskName = req.body.TaskName;
  const query = "DELETE FROM tasks WHERE Task_Name = ?";
  con.query(query, [TaskName], (err, result) => {
    if (err) throw err;
    res.json({ message: "Task  removed successfully" });
  });
});

app.post("/add", (req, res) => {
  const { TaskName, priority } = req.body;
  const query = "INSERT INTO tasks (Task_Name, Task_priority) VALUES (?, ?)";
  con.query(query, [TaskName, priority], (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ message: err });
    }
  });
});
