import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AboutMe = () => {
  const [showAbout, setShowAbout] = useState(true);
  const [tasks, setTasks] = useState({
    daily: [],
    weekly: [],
    monthly: [],
  });

  const [inputs, setInputs] = useState({
    daily: '',
    weekly: '',
    monthly: '',
  });

  const [showInputBox, setShowInputBox] = useState({
    daily: false,
    weekly: false,
    monthly: false,
  });

  const [editIndex, setEditIndex] = useState({
    daily: null,
    weekly: null,
    monthly: null,
  });

  const handleInputChange = (type, value) => {
    setInputs({ ...inputs, [type]: value });
  };

  const handleAddTask = (type) => {
    const newTask = { text: inputs[type].trim(), completed: false };
    if (newTask.text === '') return;

    const updated = [...tasks[type]];
    if (editIndex[type] !== null) {
      updated[editIndex[type]] = newTask;
    } else {
      updated.push(newTask);
    }

    setTasks({ ...tasks, [type]: updated });
    setInputs({ ...inputs, [type]: '' });
    setEditIndex({ ...editIndex, [type]: null });
    setShowInputBox({ ...showInputBox, [type]: false });
  };

  const handleDeleteTask = (type, index) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updated = [...tasks[type]];
      updated.splice(index, 1);
      setTasks({ ...tasks, [type]: updated });
    }
  };

  const toggleInputBox = (type, index = null) => {
    const newShow = { daily: false, weekly: false, monthly: false, [type]: !showInputBox[type] };
    setShowInputBox(newShow);

    if (index !== null) {
      const taskToEdit = tasks[type][index];
      setInputs({ ...inputs, [type]: taskToEdit.text });
      setEditIndex({ ...editIndex, [type]: index });
    } else {
      setInputs({ ...inputs, [type]: '' });
      setEditIndex({ ...editIndex, [type]: null });
    }
  };

  const taskData = [
    { name: 'Daily', count: tasks.daily.filter((t) => !t.completed).length },
    { name: 'Weekly', count: tasks.weekly.filter((t) => !t.completed).length },
    { name: 'Monthly', count: tasks.monthly.filter((t) => !t.completed).length },
  ];

  return (
    <div className="p-2">
      <div className="text-center mb-4">
        <button
          onClick={() => setShowAbout(!showAbout)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {showAbout ? 'List the items' : 'Go to the Board'}
        </button>
      </div>

      {showAbout ? (
        <>
          {/* Home Section */}
          <section className="bg-gray-200 p-6 rounded-md shadow-md mt-4">
            <h2 className="text-5xl font-bold mb-4 text-blue-600 text-center">Home</h2>
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRePUq6GO8tUy5G-2juuvwA9hURuHEwzjlqzA&s"
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover shadow-md mb-4 md:mb-0"
              />
              <div>
                <h1 className="text-3xl font-semibold text-black text-center">
                  Simplify Your Task Management
                </h1>
                <p className="mt-2 text-center">
                  Track, organize, and complete your tasks efficiently with our user-friendly platform.
                </p>
                <ul className="list-disc mt-4 ml-6 text-gray-700">
                  <li>Easy task organization</li>
                  <li>Priority management</li>
                  <li>User assignment</li>
                  <li>Deadline tracking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-gray-200 p-6 rounded-md shadow-md mt-4">
            <h2 className="text-5xl font-bold mb-4 text-blue-600 text-center">About</h2>
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9217/9217614.png"
                alt="About"
                className="w-40 h-40 rounded-full object-cover shadow-md mb-4 md:mb-0"
              />
              <div>
                <p className="text-gray-800 text-lg font-medium">
                  <strong>Track tasks, manage teams, and monitor performance — all in one smart platform.</strong>
                </p>
                <p className="text-gray-700 mt-2">
                  It helps digitize every department, automate workflows, and boost team collaboration with ease.
                </p>
                <ul className="list-disc mt-4 ml-6 text-gray-700">
                  <li>💡 Why Task Tracker?</li>
                  <li>All-in-one task & team management</li>
                  <li>Supports 7 Indian languages</li>
                  <li>Clean, user-friendly interface</li>
                  <li>Designed for business growth & smart automation</li>
                  <li>Say goodbye to complexity</li>
                  <li>Say hello to efficient teamwork</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Task Board Section */}
          <section className="bg-red-100 p-5 rounded-md shadow mt-6">
            <h2 className="text-5xl font-bold text-blue-800 text-center mb-6">Task Board</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              {['daily', 'weekly', 'monthly'].map((type) => (
                <div key={type} className="bg-white p-4 w-full md:w-1/3 rounded shadow text-center">
                  <h3 className="text-xl font-bold text-gray-800 capitalize mb-2">{type} Tasks</h3>

                  <button
                    onClick={() => toggleInputBox(type)}
                    className="mb-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    {showInputBox[type] ? 'Hide Input' : 'Add Task'}
                  </button>

                  {showInputBox[type] && (
                    <>
                      <input
                        type="text"
                        placeholder={`Enter ${type} task`}
                        value={inputs[type]}
                        onChange={(e) => handleInputChange(type, e.target.value)}
                        className="border px-2 py-1 rounded w-full mb-2"
                      />
                      <button
                        onClick={() => handleAddTask(type)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800 transition mb-3"
                      >
                        {editIndex[type] !== null ? 'Update Task' : 'Add Task'}
                      </button>
                    </>
                  )}

                  <ul className="text-left list-inside mt-2 text-gray-700">
                    {tasks[type].map((task, idx) => (
                      <li key={idx} className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            checked={task.completed}
                            onChange={(e) => {
                              const updated = [...tasks[type]];
                              updated[idx].completed = e.target.checked;
                              setTasks({ ...tasks, [type]: updated });
                            }}
                          />
                          <span className={task.completed ? 'line-through text-gray-400' : ''}>
                            {task.text}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleInputBox(type, idx)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTask(type, idx)}
                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Graph Section */}
          <section className="bg-white p-6 rounded-md shadow-md mt-6">
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Task Summary Graph</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default AboutMe;
