import React from 'react';

const Employee = ({employee}) => {
  return ( 
    <>
      <td>{employee.id}</td>
      <td>{employee.first_name}</td>
      <td>{employee.last_name}</td>
      <td>{employee.phone}</td>
      <td>{employee.email}</td>
    </>
   );
}
 
export default Employee;