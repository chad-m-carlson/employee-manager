import React, {useState, useEffect} from 'react';
import '../sass/main.scss';

const EmployeeForm = ({employee, updateEmployee, deleteEmployee, setShowForm, createNewEmployee}) => {
  const [id, setid] = useState();
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(true);

  useEffect( () => {
    setid(employee.id);
    setfirst_name(employee.first_name);
    setlast_name(employee.last_name);
    setPhone(employee.phone);
    setEmail(employee.email);
    if(employee.id === '') setEditing(false);
    
  },[employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing){
      let updatedEmployee = {id, first_name, last_name, phone, email}
      updateEmployee(updatedEmployee)
    }else {
      let newEmployee = {first_name, last_name, phone, email}
      createNewEmployee(newEmployee)};
    };

  const handleDelete = () => {
    if (editing) deleteEmployee(employee);
    else setShowForm(false);
  };

  return ( 
    <div className="form-container">
      <form
        className="form-container__employee-form"
        onSubmit={handleSubmit}  
      >
        <div className="employee-form">
          <label className="employee-form--label">First Name:
            <input
              className="employee-form--input"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
              required={true}
              />
          </label>
          <label className="employee-form--label">Last Name:
            <input
              className="employee-form--input"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
              required={true}
              />
          </label>
        </div>
        <div className="employee-form">
          <label className="employee-form--label">Phone:
            <input
              className="employee-form--input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required={true}
              />
          </label>
          <label className="employee-form--label">email:
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
          <button 
            onClick={handleSubmit} 
            className="employee-form--button"
          >
            {(editing) ? 'Update Employee' : 'Create Employee'}
          </button>
          <button 
            onClick={handleDelete} 
            className="employee-form--button employee-form--button--delete"
          >
            {(editing) ? 'Delete Employee' : 'Close Form'}
          </button>
        </div>
    </div>
   );
};
 
export default EmployeeForm;