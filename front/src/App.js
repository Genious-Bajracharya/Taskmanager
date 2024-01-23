import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [task, setOrders] = useState([]);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3001/orders");
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdate = async (task) => {
    const TaskName = task.Task_Name;
    console.log(TaskName);
    try {
      const res = await axios.post("http://localhost:3001/status", {
        TaskName,
      });
      console.log(res.data.message);
      alert("Status Updated successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Status already updated");
    }
  };

  const handleRemove = async (task) => {
    const TaskName = task.Task_Name;
    console.log(TaskName);
    try {
      const res = await axios.post("http://localhost:3001/remove", {
        TaskName,
      });
      console.log(res.data.message);
      alert("Status Deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Status already Deleted");
    }
  };

  const handleRemove2 = async (task) => {
    const TaskName = name;
    console.log(TaskName);
    try {
      const res = await axios.post("http://localhost:3001/remove", {
        TaskName,
      });
      console.log(res.data.message);
      alert("Status Deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Status already Deleted");
    }
  };

  const handleadd = async (task) => {
    const TaskName = name;
    try {
      const res = await axios.post("http://localhost:3001/add", {
        TaskName,
        priority,
      });
      console.log(res.data.message);
      alert("Task Added successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="main-content">
        <h2 className="main-content_h2">Task Manager</h2>
        <div className="forms">
          <form onSubmit={handleadd}>
            <input
              type="text"
              placeholder="Task name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="prority level"
              min={1}
              max={5}
              onChange={(e) => setPriority(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
          <form className="remove" onSubmit={handleRemove2}>
            <input
              type="text"
              placeholder="Task name"
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">remove</button>
          </form>
        </div>

        <table>
          <thead>
            <tr>
              <th>Task Name</th>

              <th>Status</th>
              <th>priority</th>
              <th>Change Status</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {task.map((task) => (
              <tr key={task.idtasks}>
                <td>{task.Task_Name}</td>

                <td>{task.status}</td>
                <td>{task.Task_priority}</td>
                <td>
                  <button
                    className="main-content_button"
                    onClick={() => handleUpdate(task)}
                  >
                    Done
                  </button>
                </td>
                <td>
                  <button
                    className="main-content_button"
                    onClick={() => handleRemove(task)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
