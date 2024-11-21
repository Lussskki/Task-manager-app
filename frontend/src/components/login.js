import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({ handleLogin, toggleForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]); // Initialize as an empty array
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Login request to backend
      const response = await axios.post('http://localhost:3000/api/login/', formData);
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Fetch tasks after successful login
      const tasksResponse = await axios.get('http://localhost:3000/api/profile/data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Check if tasksResponse.data is defined and has the expected format
      if (tasksResponse?.data?.data) {
        setTasks(tasksResponse.data.data); // Set tasks state
        storeTasksInLocalStorage(tasksResponse.data.data); // Save tasks to localStorage
      }

      // Update UI state and show success message
      setMessage('Login successful!');
      setIsLoggedIn(true);
      handleLogin(formData); // Pass user data to parent component
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new task
// React Component - Function to add a new task
const handleAddTask = async () => {
  if (newTask.trim()) {
      try {
          const token = localStorage.getItem('token'); // Retrieve the token
          const response = await axios.post(
              'http://localhost:3000/api/addInfo/', // Ensure this matches the backend route
              { field1: newTask }, // Sending new task as `field1`
              { headers: { Authorization: `Bearer ${token}` } } // Include the token for authentication
          );

          const updatedTasks = [...tasks, response.data.data]; // Update the task list with the new task
          setTasks(updatedTasks); // Update state with new tasks
          storeTasksInLocalStorage(updatedTasks); // Save updated tasks to localStorage
          setNewTask(''); // Clear input after adding
      } catch (error) {
          setMessage('Error adding task.'); // Error handling
      }
  }
};


  // Delete a task
  const handleDeleteTask = async (index) => {
    try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        
        // Make sure task exists
        const taskToDelete = tasks[index];
        console.log('Deleting task with ID:', taskToDelete._id);

        
        if (!taskToDelete || !taskToDelete._id) {
            console.error('No task ID found');
            return;
        }

        // Log the task ID to verify it's correct
        console.log('Deleting task with ID:', taskToDelete._id);
        console.log('Delete URL:', `http://localhost:3000/api/profile/${taskToDelete._id}`);

        
        // Send DELETE request with task ID (no need to assign the response if not used)
        await axios.delete(`http://localhost:3000/api/profile/${taskToDelete._id}`, {
          
            headers: { Authorization: `Bearer ${token}` },
        });

        // If successful, update the task list and store it locally
        const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(updatedTasks);
        storeTasksInLocalStorage(updatedTasks); // Save updated tasks to localStorage
    } catch (error) {
        console.error('Error deleting task:', error);
        setMessage('Error deleting task.');
    }
};



  
  
  
  

  // Store tasks in localStorage
  const storeTasksInLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tasks');  // Clear tasks from localStorage on logout
    setIsLoggedIn(false);
    setTasks([]); // Reset tasks state
    setMessage('');
    toggleForm(); // Switch to the sign-up form
  };

  // Display task manager when logged in
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
        <ul>
          {/* Safely map over tasks */}
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li key={task._id}>
                {task.field1}  {/* Assuming 'field1' is the task name */}
                <button
                  onClick={() => handleDeleteTask(index)}
                  style={{ marginLeft: '10px', color: 'red' }}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li>No tasks available</li>
          )}
        </ul>
        <button onClick={handleLogout} style={{ marginTop: '20px', color: 'blue' }}>
          Sign Out
        </button>
      </div>
    );
  }

  // Display login form when not logged in
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
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
            value={formData.password || ''}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
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
