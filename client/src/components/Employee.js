import React from 'react';

const Employee = ({employee}) => {
  return ( 
    <>
      <td>{employee.employeeId}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.phone}</td>
      <td>{employee.email}</td>
    </>
   );
}
 
export default Employee;