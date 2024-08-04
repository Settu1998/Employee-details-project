import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import EmployeeEditForm from './EmployeeEditForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/employees' component={EmployeeList} />
          <Route exact path='/employees/new' component={() => <EmployeeForm onFormSubmit={() => window.location.href = '/employees'} />} />
          <Route exact path='/employees/edit/:id' component={EmployeeEditForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
