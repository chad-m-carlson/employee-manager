import React, {useState, useEffect} from 'react';
import '../sass/main.scss';

const EmployeeForm = ({employee, updateEmployee, deleteEmployee}) => {
  const [employeeId, setEmployeeId] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(true);

  useEffect( () => {
    setEmployeeId(employee.employeeId);
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setPhone(employee.phone);
    setEmail(employee.email);
    if(employee.employeeId === '') setEditing(false);
    
  },[employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedEmployee = {employeeId, firstName, lastName, phone, email}
      updateEmployee(updatedEmployee)
    }

  const handleDelete = () => {
    deleteEmployee(employee)
  }

  return ( 
    <div className="form-container">
      <form
        className="form-container__employee-form"
        onSubmit={handleSubmit}  
      >
        <div className="employee-form--name">
          <label> ID: 
            <input
              className="employee-form--input"
              type="number"
              min="1"
              max="99999999"
              value={employeeId}
              onChange={(e) => setEmployeeId(parseInt(e.target.value))}
              required={true}
              disabled={editing}
            />
          </label>
          <label>First Name:
            <input
              className="employee-form--input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required={true}
              />
          </label>
          <label>Last Name:
            <input
              className="employee-form--input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required={true}
              />
          </label>
        </div>
        <div className="employee-form--info">
          <label>Phone:
            <input
              className="employee-form--input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required={true}
              />
          </label>
          <label>email
            <input
              className="employee-form--input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              />
          </label>
        </div>
      </form>
        <div className="button-container">
          <button onClick={handleSubmit} className="employee-form--button">Save</button>
          <button 
            onClick={handleDelete} 
            className="employee-form--button employee-form--button--delete"
          >
            {(employeeId === '') ? 'Close Form' : 'Delete Employee'}
          </button>
        </div>
    </div>
   );
}
 
export default EmployeeForm;