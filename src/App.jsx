import { useState, useEffect } from "react";

function useLocation() {
  const [path, setPath] = useState(window.location.hash.slice(1) || "/");
  useEffect(() => {
    const onHash = () => setPath(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return path;
}

function useNavigate() {
  return (to) => (window.location.hash = to);
}

function Link({ to, children, className }) {
  return (
    <a
      href={"#" + to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.location.hash = to;
      }}
    >
      {children}
    </a>
  );
}

function Route({ path, currentPath, element }) {
  return currentPath === path ? element : null;
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 50%, #e8ecf8 100%);
    min-height: 100vh;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #1e293b;
    padding: 14px 28px;
    box-shadow: 0 4px 20px rgba(0,0,0,.15);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .navbar .brand {
    font-size: 20px;
    font-weight: 700;
    color: #60a5fa;
    letter-spacing: .5px;
  }
  .nav-links { display: flex; gap: 6px; }
  .nav-links a {
    text-decoration: none;
    color: #cbd5e1;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all .2s;
  }
  .nav-links a:hover { background: #334155; color: #fff; }
  .nav-links a.active-link { background: #3b82f6; color: #fff; }

  .page {
    max-width: 580px;
    margin: 32px auto;
    padding: 0 16px;
    animation: fadeIn .35s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .card {
    background: #fff;
    border-radius: 16px;
    padding: 28px;
    box-shadow: 0 4px 24px rgba(0,0,0,.06);
  }

  .page-title {
    font-size: 26px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 20px;
    text-align: center;
  }

  .input-row { display: flex; gap: 10px; margin-bottom: 20px; }
  .input-row input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 14px;
    font-family: inherit;
    transition: border .2s;
    outline: none;
  }
  .input-row input:focus { border-color: #3b82f6; }
  .btn-add {
    padding: 12px 22px;
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: inherit;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: background .2s, transform .1s;
  }
  .btn-add:hover { background: #2563eb; }
  .btn-add:active { transform: scale(.96); }

  .filter-row { display: flex; gap: 8px; margin-bottom: 20px; justify-content: center; }
  .filter-btn {
    padding: 8px 18px;
    border: 2px solid #e2e8f0;
    background: transparent;
    border-radius: 20px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    color: #64748b;
    cursor: pointer;
    transition: all .2s;
  }
  .filter-btn:hover { border-color: #3b82f6; color: #3b82f6; }
  .filter-btn.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }

  .task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border: 1px solid #f1f5f9;
    border-radius: 12px;
    margin-bottom: 10px;
    background: #fafbff;
    transition: all .2s;
  }
  .task-item:hover { box-shadow: 0 2px 12px rgba(59,130,246,.1); transform: translateX(4px); }
  .task-item.done-item { background: #f0fdf4; border-color: #bbf7d0; }

  .task-text { font-size: 14px; color: #334155; font-weight: 500; }
  .task-text.struck { text-decoration: line-through; color: #94a3b8; }

  .task-actions { display: flex; gap: 6px; }
  .btn-done, .btn-delete, .btn-undo {
    padding: 6px 14px;
    border: none;
    border-radius: 8px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all .15s;
  }
  .btn-done  { background: #22c55e; color: #fff; }
  .btn-done:hover  { background: #16a34a; }
  .btn-undo  { background: #f59e0b; color: #fff; }
  .btn-undo:hover  { background: #d97706; }
  .btn-delete { background: #ef4444; color: #fff; }
  .btn-delete:hover { background: #dc2626; }

  .summary {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    padding: 14px;
    background: #f8fafc;
    border-radius: 12px;
  }
  .summary-item { text-align: center; }
  .summary-num { font-size: 22px; font-weight: 700; color: #3b82f6; }
  .summary-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: .5px; }

  .no-tasks { text-align: center; padding: 32px 0; color: #94a3b8; font-size: 14px; }

  .about-section { margin-bottom: 18px; }
  .about-section h3 { font-size: 16px; color: #3b82f6; margin-bottom: 6px; }
  .about-section p, .about-section li { font-size: 14px; color: #475569; line-height: 1.7; }
  .about-section ul { padding-left: 20px; }

  .event-log {
    margin-top: 16px;
    padding: 12px 16px;
    background: #f1f5f9;
    border-radius: 10px;
    font-size: 12px;
    color: #64748b;
    max-height: 90px;
    overflow-y: auto;
  }
  .event-log strong { color: #3b82f6; }

  .tooltip-wrapper { position: relative; display: inline-block; }
  .tooltip-box {
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    background: #1e293b;
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 11px;
    white-space: nowrap;
    pointer-events: none;
    animation: fadeIn .2s ease;
  }
`;

function TaskItem({ task, onDone, onUndo, onDelete, onLog }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={task.done ? "task-item done-item" : "task-item"}
      onMouseEnter={() => { setHovered(true);  onLog("onMouseEnter → " + task.text); }}
      onMouseLeave={() => { setHovered(false); onLog("onMouseLeave → " + task.text); }}
      onDoubleClick={() => onLog("onDoubleClick → " + task.text)}
    >
      <div className="tooltip-wrapper">
        {hovered && <div className="tooltip-box">Double-click to log event</div>}
        <span className={task.done ? "task-text struck" : "task-text"}>{task.text}</span>
      </div>
      <div className="task-actions">
        {task.done ? (
          <button className="btn-undo" onClick={() => onUndo(task.id)}>Undo</button>
        ) : (
          <button className="btn-done" onClick={() => onDone(task.id)}>Done</button>
        )}
        <button className="btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

function TaskSummary({ total, completed, remaining }) {
  return (
    <div className="summary">
      <div className="summary-item">
        <div className="summary-num">{total}</div>
        <div className="summary-label">Total</div>
      </div>
      <div className="summary-item">
        <div className="summary-num">{completed}</div>
        <div className="summary-label">Completed</div>
      </div>
      <div className="summary-item">
        <div className="summary-num">{remaining}</div>
        <div className="summary-label">Remaining</div>
      </div>
    </div>
  );
}

function Navbar({ currentPath }) {
  const links = [
    { to: "/",          label: "Home" },
    { to: "/add",       label: "Add Task" },
    { to: "/completed", label: "Completed" },
    { to: "/about",     label: "About" },
  ];

  return (
    <nav className="navbar">
      <span className="brand">📋 TaskRouter</span>
      <div className="nav-links">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={currentPath === l.to ? "active-link" : ""}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function HomePage({ tasks, filter, setFilter, onDone, onUndo, onDelete, onLog, eventLog }) {
  const visibleTasks = tasks.filter((t) => {
    if (filter === "active")    return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  const completed = tasks.filter((t) => t.done).length;
  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">📝 All Tasks</h1>

        <div className="filter-row">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              className={filter === f ? "filter-btn active" : "filter-btn"}
              onClick={() => { setFilter(f); onLog("onClick → Filter: " + f); }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {visibleTasks.length === 0 ? (
          <p className="no-tasks">No tasks to show.</p>
        ) : (
          visibleTasks.map((task) => (
            <TaskItem key={task.id} task={task} onDone={onDone} onUndo={onUndo} onDelete={onDelete} onLog={onLog} />
          ))
        )}

        <TaskSummary total={tasks.length} completed={completed} remaining={remaining} />

        <div className="event-log">
          <strong>Event Log:</strong>{" "}
          {eventLog.length === 0
            ? "Interact with tasks to see events..."
            : eventLog.slice(-5).map((e, i) => <div key={i}>{e}</div>)}
        </div>
      </div>
    </div>
  );
}

function AddTaskPage({ onAdd, onLog }) {
  const [text, setText]       = useState("");
  const [message, setMessage] = useState("");

  function handleAdd() {
    if (text.trim() === "") {
      setMessage("⚠️ Please enter a task!");
      onLog("onSubmit → Empty input blocked");
      return;
    }
    onAdd(text.trim());
    onLog("onSubmit → Added: " + text.trim());
    setMessage("✅ Task added successfully!");
    setText("");
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">➕ Add New Task</h1>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a task..."
            value={text}
            onChange={(e) => { setText(e.target.value); onLog("onChange → " + e.target.value); }}
            onKeyDown={(e) => { if (e.key === "Enter") { handleAdd(); onLog("onKeyDown → Enter"); } }}
            onFocus={() => onLog("onFocus → Input focused")}
            onBlur={() => onLog("onBlur → Input blurred")}
          />
          <button className="btn-add" onClick={handleAdd}>Add Task</button>
        </div>

        {message && <p style={{ textAlign: "center", fontSize: 14, color: message.startsWith("✅") ? "#22c55e" : "#f59e0b" }}>{message}</p>}
      </div>
    </div>
  );
}

function CompletedPage({ tasks, onUndo, onDelete, onLog }) {
  const done = tasks.filter((t) => t.done);

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">✅ Completed Tasks</h1>
        {done.length === 0 ? (
          <p className="no-tasks">No completed tasks yet.</p>
        ) : (
          done.map((task) => (
            <TaskItem key={task.id} task={task} onDone={() => {}} onUndo={onUndo} onDelete={onDelete} onLog={onLog} />
          ))
        )}
      </div>
    </div>
  );
}

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">ℹ️ About This App</h1>

        <div className="about-section">
          <h3>Project</h3>
          <p>TaskRouter — A To-Do List SPA built with React demonstrating <strong>Routing</strong> and <strong>Event Handling</strong>.</p>
        </div>

        <div className="about-section">
          <h3>Developer</h3>
          <p>Varad Mujumdar</p>
        </div>

        <div className="about-section">
          <h3>React Router Concepts Used</h3>
          <ul>
            <li>Hash-based Routing (simulates BrowserRouter)</li>
            <li>Route — renders component per path</li>
            <li>Link — navigation without page reload</li>
            <li>useLocation — reads current route</li>
            <li>useNavigate — programmatic navigation</li>
          </ul>
        </div>

        <div className="about-section">
          <h3>Event Handling Demonstrated</h3>
          <ul>
            <li>onClick — buttons &amp; filters</li>
            <li>onChange — input field tracking</li>
            <li>onKeyDown — Enter key to add task</li>
            <li>onSubmit — form validation</li>
            <li>onFocus / onBlur — input focus tracking</li>
            <li>onMouseEnter / onMouseLeave — hover tooltip</li>
            <li>onDoubleClick — event logging</li>
          </ul>
        </div>

        <button
          className="btn-add"
          style={{ width: "100%", marginTop: 8 }}
          onClick={() => navigate("/add")}
        >
          Go to Add Task →
        </button>
      </div>
    </div>
  );
}

function App() {
  const currentPath = useLocation();

  const [tasks, setTasks] = useState([
    { id: 1, text: "Study React JS",      done: false },
    { id: 2, text: "Complete assignment",  done: false },
    { id: 3, text: "Push code to GitHub",  done: true  },
  ]);
  const [filter,   setFilter]   = useState("all");
  const [eventLog, setEventLog] = useState([]);

  function logEvent(msg) {
    setEventLog((prev) => [...prev, msg]);
  }

  function addTask(text) {
    setTasks((prev) => [...prev, { id: Date.now(), text, done: false }]);
  }

  function markDone(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: true } : t)));
  }

  function undoTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: false } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      <style>{css}</style>
      <Navbar currentPath={currentPath} />
      <Route path="/" currentPath={currentPath} element={
        <HomePage tasks={tasks} filter={filter} setFilter={setFilter} onDone={markDone} onUndo={undoTask} onDelete={deleteTask} onLog={logEvent} eventLog={eventLog} />
      } />
      <Route path="/add" currentPath={currentPath} element={<AddTaskPage onAdd={addTask} onLog={logEvent} />} />
      <Route path="/completed" currentPath={currentPath} element={<CompletedPage tasks={tasks} onUndo={undoTask} onDelete={deleteTask} onLog={logEvent} />} />
      <Route path="/about" currentPath={currentPath} element={<AboutPage />} />
    </>
  );
}

export default App;
