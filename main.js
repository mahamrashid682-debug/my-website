console.log("Server file is running...");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, description: "Wake up early and get ready", status: "completed" },
  { id: 2, description: "Attend university classes", status: "completed" },
  { id: 3, description: "Complete homework or study session", status: "pending" },
  { id: 4, description: "Go for an evening walk", status: "pending" }
];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { description, status } = req.body;

    const newTask = {
        id: tasks.length + 1,
        description,
        status
    };

    tasks.push(newTask);
    res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, status: "completed" };
        }
        return task;
    });

    res.json({ message: "Task updated" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
