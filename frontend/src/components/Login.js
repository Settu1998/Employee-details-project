import React, { useState } from 'react';
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const { userName, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    // Validation
    if (!userName || !password) {
      alert('Please fill in all fields');
      return;
    }
    // Check login validity
    if (userName === 'admin' && password === 'Settu') {
      // Assuming login is successful
      localStorage.setItem('userName', userName);
      window.location.href = '/dashboard'; // Redirect to Dashboard
    } else {
      alert('Invalid login details');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type='text'
            placeholder='Username'
            name='userName'
            value={userName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default Login;
