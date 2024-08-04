import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import EmployeeEditForm from './EmployeeEditForm';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const history = useHistory();

  // Fetch employees when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/tasks`);
        if (res.data.tasks && Array.isArray(res.data.tasks)) {
          setEmployees(res.data.tasks);
        } else {
          console.error("Expected an array of tasks in API response, but received:", res.data);
        }
      } catch (err) {
        console.error("Error fetching employees: ", err);
        console.log(`${process.env.REACT_APP_API}/api/v1/tasks`)
      }
    };
    fetchEmployees();
  }, []);

  // Handle delete employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/api/v1/tasks/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (err) {
      console.error("Error deleting employee: ", err);
    }
  };

  // Set the employee to be edited
  const handleEdit = (id) => {
    setEditEmployeeId(id);
  };

  // Refresh the employee list after an update or addition
  const handleUpdated = async () => {
    setEditEmployeeId(null); // Reset edit mode
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/tasks`);
      if (res.data.tasks && Array.isArray(res.data.tasks)) {
        setEmployees(res.data.tasks);
      } else {
        console.error("Expected an array of tasks in API response, but received:", res.data);
      }
    } catch (err) {
      console.error("Error refreshing employee list: ", err);
    }
  };

  // Render loading state if employees is still an empty array or not an array
  if (!Array.isArray(employees) || employees.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="employee-list">
      <h1>Employee List</h1>
      <Link to="/dashboard">Back to Dashboard</Link>
      <button onClick={() => history.push('/employees/new')} style={{ float: 'right' }}>Add Employee</button>
      {editEmployeeId ? (
        <EmployeeEditForm employeeId={editEmployeeId} onUpdated={handleUpdated} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                <td>{employee.f_id}</td>
                <td>{employee.f_name}</td>
                <td>{employee.f_Email}</td>
                <td>{employee.f_Mobile}</td>
                <td>{employee.f_Designation}</td>
                <td>{employee.f_gender}</td>
                <td>{employee.f_Course}</td>
                <td>{new Date(employee.f_Createdate).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
