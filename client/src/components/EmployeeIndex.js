import React, {useState, useEffect } from 'react';
import Employee from './Employee';
import EmployeeForm from './EmployeeForm';
import NavBar from './NavBar';
import axios from 'axios';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../sass/main.scss';


const EmployeeIndex = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect( () => {
    axios.get(`/api/employees`)
      .then(res => {
        console.log(res.data)
        setEmployees(res.data)
      })
  }, [])

  const handleClick = (employee) => {
    if (showForm === true && selectedEmployee.employeeId !== employee.employeeId) setShowForm(!false)
    else setShowForm(!showForm);
    setSelectedEmployee(employee)
  };

  const updateEmployee = (updatedEmployee) => {
    const currentEmployees = employees.filter( e => e.employeeId !== updatedEmployee.employeeId)
    setEmployees([...currentEmployees, {...updatedEmployee}]);
    setShowForm(false);
  };

  const deleteEmployee = (employee) => {
    const currentEmployees = employees.filter( e => e.employeeId !== employee.employeeId)
    setEmployees([...currentEmployees]);
    setShowForm(false);
  };

  const addEmployee = () => {
    setSelectedEmployee({employeeId: '', firstName: '', lastName: '', email: '', phone: ''});
    setShowForm(true);
  };

  const sortTable = (row) => {
    switch(row){
      case 'firstName':
        var sortedEmployees = employees.sort( (a, b) => {
          if(a.firstName.toLowerCase() < b.firstName.toLowerCase()) {return -1; }
          else if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {return 1; }
          return 0;
        })
        setEmployees([...sortedEmployees])
        break;
      case 'lastName':
        sortedEmployees = employees.sort( (a, b) => {
          if(a.lastName.toLowerCase() < b.lastName.toLowerCase()) {return -1; }
          else if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {return 1; }
          return 0;
        })
        setEmployees([...sortedEmployees])
        break;
      default:
        sortedEmployees = employees.sort( (a, b) => {
          if(a.employeeId < b.employeeId) {return -1; }
          else if (a.employeeId > b.employeeId) {return 1; }
          return 0;
        })
        setEmployees([...sortedEmployees]);
    }
  };

  return ( 
    <>
      <NavBar addEmployee={addEmployee}/>
      <div className="page-container">
        <table className="employee-table">
          <tbody>

          <tr className="employee-table__header-row">
            <th className="employee-table__header-row">ID &nbsp;
              <div className="u__tooltip">
                <FontAwesomeIcon 
                  onClick={() => sortTable('id')}
                  icon={faSort} 
                  />
                  <span className="u__tooltip--text">Click to sort</span>
              </div>
            </th>
            <th className="employee-table__header-row">First Name &nbsp;
            <div className="u__tooltip">
              <FontAwesomeIcon 
                onClick={() => sortTable('firstName')}
                icon={faSort} 
                />
                <span className="u__tooltip--text">Click to sort</span>
              </div>
            </th>
            <th className="employee-table__header-row">Last name &nbsp;
            <div className="u__tooltip">
              <FontAwesomeIcon 
                onClick={() => sortTable('lastName')}
                icon={faSort} 
                />
                <span className="u__tooltip--text">Click to sort</span>
              </div>
            </th>
            <th className="employee-table__header-row">Phone</th>
            <th className="employee-table__header-row">Email</th>
          </tr>
            {employees.map( e => 
              <tr 
              className="employee-table__content u-hoverable-row"
              onClick={() => {handleClick(e)}}
              key={e.employeeId}
              >
                <Employee 
                employee={e}  
                />
              </tr>
            )}
          </tbody>
        </table>
        {showForm && 
          <EmployeeForm 
            employee={selectedEmployee}
            updateEmployee={updateEmployee}
            deleteEmployee={deleteEmployee}
          />
        }
      </div>
    </>
   );
}
 
export default EmployeeIndex;