import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({ user, handleLogin, toggleForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status
  const [tasks, setTasks] = useState([]);  // State to store tasks
  const [newTask, setNewTask] = useState('');  // State for the new task input

  // Pre-fill the form with user data (if user exists)
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        password: user.password,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      // Send login request to backend
      const response = await axios.post('http://localhost:3000/api/login', formData)
      const userInfo = response.data
      handleLogin(userInfo)
    }catch(error){
      setMessage('Login failed. Please check your credentials.')
    }
    if (!user) {
      setMessage('User data is missing.');
      return;
    }

    // Assuming successful login
    const userInfo = {
      username: user.username,
      email: formData.email,
      password: formData.password,
    };

    setMessage('');  // Clear previous messages
    setIsLoggedIn(true);  // Mark as logged in
    handleLogin(userInfo);
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);  // Add the new task to the task list
      setNewTask('');  // Clear the input field
    }
  };

  // Handle deleting a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);  // Update the tasks list without the deleted task
  };

  // Handle logging out
  const handleLogout = () => {
    setIsLoggedIn(false);  // Mark as logged out
    setTasks([]);  // Clear tasks
    setMessage('');  // Clear any messages
    toggleForm();  // Toggle back to the login form
  };
  // Display the task manager UI if logged in
  if (isLoggedIn) {
    return (
      <div className="task-manager">
        <h2>Task Manager</h2>
        <div>
          <input
            type="text"
            placeholder="Add your task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        {/* Display the task list */}
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleDeleteTask(index)} style={{ marginLeft: '10px', color: 'red' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        {/* Sign Out button to log out */}
        <button onClick={handleLogout} style={{ marginTop: '20px', color: 'blue' }}>
          Sign Out
        </button>
      </div>
    );
  }

  
  // Show login form if not logged in
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={toggleForm}>Sign up</button>
      </p>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Login;
