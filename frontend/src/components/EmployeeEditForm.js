import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeEditForm.css';

const EmployeeEditForm = ({ employeeId, onUpdated }) => {
  const [employee, setEmployee] = useState({
    f_id: '',
    f_name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/tasks/${employeeId}`);
        console.log(res.data);
        if (res.data && res.data.task) {
          const {f_id, f_name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = res.data.task;
          setEmployee({
            f_id, 
            f_name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course
          });
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching employee data:", err);
        setError("Error fetching employee data");
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setEmployee({
        ...employee,
        f_Course: value
      });
    } else {
      setEmployee({
        ...employee,
        [name]: value
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/tasks/${employeeId}`, employee);
      if (res.data && res.data.task) {
        console.log("Update successful:", res.data.task);
        onUpdated(); // Notify parent component of update
      } else {
        console.error("Unexpected response data:", res.data);
        setError("Unexpected response data");
      }
    } catch (err) {
      console.error("Error updating employee:", err);
      setError("Error updating employee");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Edit Employee</h2>
      <form>
      <div>
          <label>Sno:</label>
          <input type="text" name="f_id" value={employee.f_id} onChange={handleChange} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="f_name" value={employee.f_name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="f_Email" value={employee.f_Email} onChange={handleChange} />
        </div>
        <div>
          <label>Mobile:</label>
          <input type="text" name="f_Mobile" value={employee.f_Mobile} onChange={handleChange} />
        </div>
        <div>
          <label>Designation:</label>
          <input type="text" name="f_Designation" value={employee.f_Designation} onChange={handleChange} />
        </div>
        <div>
          <label>Gender:</label>
          <select name="f_gender" value={employee.f_gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Course:</label>
          <input type="radio" name="f_Course" value="MCA" checked={employee.f_Course === 'MCA'} onChange={handleChange} /> MCA
          <input type="radio" name="f_Course" value="BCA" checked={employee.f_Course === 'BCA'} onChange={handleChange} /> BCA
          <input type="radio" name="f_Course" value="BSC" checked={employee.f_Course === 'BSC'} onChange={handleChange} /> BSC
        </div>
        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default EmployeeEditForm;
