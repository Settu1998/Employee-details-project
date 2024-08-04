import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import './EmployeeForm.css';

const EmployeeForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    f_id: '',
    f_name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: '',
  });

  const { f_id, f_name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!f_id || !f_name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/v1/tasks', formData);
      onFormSubmit();
    } catch (err) {
      console.error("Error submitting form: ", err);
    }
  };

  return (
    <div className="employee-form">
      <h2>Add Employee</h2>
      <div>
        <Link to="/employees">Back to EmployeeList</Link>
      </div>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Sno:</label>
          <input type="text" name="f_id" value={f_id} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="f_name" value={f_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="f_Email" value={f_Email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile:</label>
          <input type="text" name="f_Mobile" value={f_Mobile} onChange={handleChange} required />
        </div>
        <div>
          <label>Designation:</label>
          <select name="f_Designation" value={f_Designation} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="MANAGER">MANAGER</option>
            <option value="HR">HR</option>
            <option value="FULLSTACK DEVELOPER">FULLSTACK DEVELOPER</option>
            <option value="BACKEND DEVELOPER">BACKEND DEVELOPER</option>
            <option value="FRONTEND DEVELOPER">FRONTEND DEVELOPER</option>
            <option value="SALES">SALES</option>
            </select>
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input type="radio" name="f_gender" value="Male" checked={f_gender === 'Male'} onChange={handleChange} required /> Male
          </label>
          <label>
            <input type="radio" name="f_gender" value="Female" checked={f_gender === 'Female'} onChange={handleChange} required /> Female
          </label>
        </div>
        <div>
          <label>Courses:</label>
          <label>
            <input type="radio" name="f_Course" value="MBA" checked={f_Course === 'MBA'} onChange={handleChange} /> MBA
          </label>
          <label>
            <input type="radio" name="f_Course" value="MCA" checked={f_Course === 'MCA'} onChange={handleChange} /> MCA
          </label>
          <label>
            <input type="radio" name="f_Course" value="BE" checked={f_Course === 'BE'} onChange={handleChange} /> BE
          </label>
          <label>
            <input type="radio" name="f_Course" value="B.Tech" checked={f_Course === 'B.Tech'} onChange={handleChange} /> B.Tech
          </label>
          <label>
            <input type="radio" name="f_Course" value="BCA" checked={f_Course === 'BCA'} onChange={handleChange} /> BCA
          </label>
          <label>
            <input type="radio" name="f_Course" value="BSC" checked={f_Course === 'BSC'} onChange={handleChange} /> BSC
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
