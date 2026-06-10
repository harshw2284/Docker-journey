const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory store
let todos = [
  { id: uuidv4(), text: "Build something great", completed: false, createdAt: new Date().toISOString() },
  { id: uuidv4(), text: "Dockerize the app",     completed: false, createdAt: new Date().toISOString() },
];

// GET all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// POST create todo
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Todo text is required" });
  }
  const todo = { id: uuidv4(), text: text.trim(), completed: false, createdAt: new Date().toISOString() };
  todos.unshift(todo);
  res.status(201).json(todo);
});

// PATCH toggle completed
app.patch("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  todo.completed = !todo.completed;
  res.json(todo);
});

// DELETE a todo
app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Todo not found" });
  todos.splice(index, 1);
  res.status(204).send();
});

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));