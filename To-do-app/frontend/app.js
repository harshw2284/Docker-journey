// ── Config ───────────────────────────────────────────────
const API = "http://localhost:4000/api/todos";

// ── State ────────────────────────────────────────────────
let todos  = [];
let filter = "all"; // all | active | completed

// ── DOM refs ─────────────────────────────────────────────
const form        = document.getElementById("todo-form");
const input       = document.getElementById("todo-input");
const list        = document.getElementById("todo-list");
const counter     = document.getElementById("counter");
const emptyState  = document.getElementById("empty-state");
const errorBanner = document.getElementById("error-banner");
const filterBtns  = document.querySelectorAll(".filter");

// ── API helpers ───────────────────────────────────────────
async function fetchTodos() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to load todos");
  return res.json();
}

async function createTodo(text) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

async function toggleTodo(id) {
  const res = await fetch(`${API}/${id}`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

async function deleteTodo(id) {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
}

// ── Render ────────────────────────────────────────────────
function filtered() {
  if (filter === "active")    return todos.filter((t) => !t.completed);
  if (filter === "completed") return todos.filter((t) =>  t.completed);
  return todos;
}

function render() {
  const visible = filtered();
  const active  = todos.filter((t) => !t.completed).length;

  counter.textContent = `${active} left`;
  list.innerHTML = "";

  if (!visible.length) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  visible.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item${todo.completed ? " done" : ""}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <button class="check-btn" aria-label="Toggle complete">
        <svg class="check-icon" viewBox="0 0 12 10" width="12" height="10"
             fill="none" stroke="currentColor" stroke-width="2.2"
             stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1 5 4.5 8.5 11 1"/>
        </svg>
      </button>
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <button class="del-btn" aria-label="Delete todo">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6"  y1="6" x2="18" y2="18"/>
        </svg>
      </button>`;

    li.querySelector(".check-btn").addEventListener("click", () => handleToggle(todo.id));
    li.querySelector(".del-btn").addEventListener("click", () => handleDelete(todo.id));
    list.appendChild(li);
  });
}

// ── Handlers ─────────────────────────────────────────────
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  hideError();

  try {
    const todo = await createTodo(text);
    todos.unshift(todo);
    render();
  } catch (err) {
    showError(err.message);
  }
});

async function handleToggle(id) {
  hideError();
  try {
    const updated = await toggleTodo(id);
    todos = todos.map((t) => (t.id === id ? updated : t));
    render();
  } catch (err) {
    showError(err.message);
  }
}

async function handleDelete(id) {
  hideError();
  try {
    await deleteTodo(id);
    todos = todos.filter((t) => t.id !== id);
    render();
  } catch (err) {
    showError(err.message);
  }
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

// ── Utilities ─────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

function showError(msg) {
  errorBanner.textContent = `⚠ ${msg}`;
  errorBanner.classList.remove("hidden");
}

function hideError() {
  errorBanner.classList.add("hidden");
}

// ── Boot ──────────────────────────────────────────────────
(async () => {
  try {
    todos = await fetchTodos();
  } catch {
    showError("Cannot reach the backend. Is it running?");
  }
  render();
})();