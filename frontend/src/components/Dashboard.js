import React from 'react';
import './Dashboard.css'
import logo from './pics/1698428395346.jpeg'

const Dashboard = () => {
  // Retrieve user name from local storage
  const userName = localStorage.getItem('userName');

  // Logout function
  const logout = () => {
    localStorage.removeItem('userName');
    window.location.href = '/'; // Redirect to Login
  };

  return (
    <div>
      <div>
        <img src={logo} alt="Logo"/>
      </div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button onClick={() => window.location.href = '/employees'}>Employee List</button>
        <span>User Name: {userName}</span>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <p>Welcome to Admin Panel</p>
      </div>
      {/* Implement additional Dashboard content here */}
    </div>
  );
};

export default Dashboard;
