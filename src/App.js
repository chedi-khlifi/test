import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Set up the repository', done: true },
    { id: 2, text: 'Configure GitHub Actions', done: true },
    { id: 3, text: 'Deploy to GitHub Pages', done: false },
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  function addTask(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const newTask = { id: Date.now(), text, done: false };
    setTasks([...tasks, newTask]);
    setInput('');
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const visibleTasks = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const remaining = tasks.filter(t => !t.done).length;

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager</h1>
        <p className="subtitle">demo</p>
      </header>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task…"
          aria-label="New task"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters" role="group" aria-label="Filter tasks">
        {['all', 'active', 'done'].map(f => (
          <button
            key={f}
            className={filter === f ? 'filter active' : 'filter'}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {visibleTasks.length === 0 && (
          <li className="empty">No tasks here.</li>
        )}
        {visibleTasks.map(task => (
          <li key={task.id} className={task.done ? 'task done' : 'task'}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
            </label>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label={`Delete ${task.text}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <footer className="footer">
        <span>{remaining} task{remaining !== 1 ? 's' : ''} remaining</span>
      </footer>
    </div>
  );
}

export default App;
