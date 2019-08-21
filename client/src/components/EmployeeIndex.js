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
        setEmployees(res.data)
      })
  }, [])

  const handleClick = (employee) => {
    if (showForm === true && selectedEmployee.id !== employee.id) setShowForm(!false)
    else setShowForm(!showForm);
    setSelectedEmployee(employee)
  };

  const updateEmployee = (updatedEmployee) => {
    const currentEmployees = employees.filter( e => e.id !== updatedEmployee.id)
    setEmployees([...currentEmployees, {...updatedEmployee}]);
    setShowForm(false);
  };

  const deleteEmployee = (employee) => {
    const currentEmployees = employees.filter( e => e.id !== employee.id)
    axios.delete(`/api/employees/${employee.id}`)
    .then(res => {
        setEmployees([...currentEmployees]);
        setShowForm(false)
      });
  };

  const addEmployee = () => {
    setSelectedEmployee({id: '', first_name: '', last_name: '', email: '', phone: ''});
    setShowForm(true);
  };

  const sortTable = (row) => {
    let sortedEmployees = []
    switch(row){
      case 'first_name':
        sortedEmployees = employees.sort( (a, b) => {
          if(a.first_name.toLowerCase() < b.first_name.toLowerCase()) {return -1; }
          else if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {return 1; }
          return 0;
        })
        setEmployees([...sortedEmployees])
        break;
      case 'last_name':
        sortedEmployees = employees.sort( (a, b) => {
          if(a.last_name.toLowerCase() < b.last_name.toLowerCase()) {return -1; }
          else if (a.last_name.toLowerCase() > b.last_name.toLowerCase()) {return 1; }
          return 0;
        })
        setEmployees([...sortedEmployees])
        break;
      default:
        sortedEmployees = employees.sort( (a, b) => {
          if(a.id < b.id) {return -1; }
          else if (a.id > b.id) {return 1; }
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
                onClick={() => sortTable('first_name')}
                icon={faSort} 
                />
                <span className="u__tooltip--text">Click to sort</span>
              </div>
            </th>
            <th className="employee-table__header-row">Last name &nbsp;
            <div className="u__tooltip">
              <FontAwesomeIcon 
                onClick={() => sortTable('last_name')}
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
              key={e.id}
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
            setShowForm={setShowForm}
          />
        }
      </div>
    </>
   );
}
 
export default EmployeeIndex;