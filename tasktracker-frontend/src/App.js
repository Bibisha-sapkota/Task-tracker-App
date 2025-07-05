import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';
import TaskList from './components/TaskList';
import AboutMe from './components/Aboutme';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('my_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setWelcomeMessage("Welcome to your Task Tracker!");
    const timer = setTimeout(() => setWelcomeMessage(""), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("my_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const addTask = () => {
    if (newTask.trim() !== "") {
      const taskObj = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, taskObj]);
      setNewTask("");
    }
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setEditTaskId(task.id);
    setNewTask(task.text);
  };

  const updateTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: newTask.trim() } : task
      );
      setTasks(updatedTasks);
      setNewTask("");
      setIsEditing(false);
      setEditTaskId(null);
    }
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const deleteAllTasks = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all tasks?");
    if (confirmDelete) {
      setTasks([]);
    }
  };

  const TaskDashboard = () => (
    <main className="container mx-auto my-8 flex-grow p-4">
      {welcomeMessage && (
        <div className="bg-blue-100 text-blue-800 p-2 rounded mb-6">
          {welcomeMessage}
        </div>
      )}

      <h1 className="text-xl mb-4 font-extrabold">The best task tracker app in 2025</h1>
      <h2 className="text-lg mb-4 font-semibold">List the things for your workspace</h2>

      {!isLoggedIn ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-6">
          Please{" "}
          <a href="/login" className="underline text-blue-600">
            Login
          </a>{" "}
          or{" "}
          <a href="/signup" className="underline text-blue-600">
            Sign Up
          </a>{" "}
          to add tasks.
        </div>
      ) : (
        <>
          <div className="flex items-center mb-4 space-x-2">
            <input
              type="text"
              className="p-2 border rounded w-full"
              placeholder="Enter a task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            {!isEditing ? (
              <Button type="add" onClick={addTask} />
            ) : (
              <button
                onClick={updateTask}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Update
              </button>
            )}
            <button
              onClick={deleteAllTasks}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete All
            </button>
          </div>
        </>
      )}

      <AboutMe />

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        ontogglecomplete={toggleComplete}
        onEdit={handleEdit}
      />
    </main>
  );

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<TaskDashboard />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
