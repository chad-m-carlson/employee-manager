import React from 'react';
import '../sass/main.scss';

const Navbar = ({addEmployee}) => {

  const handleClick = () => {
    addEmployee()
  };

  return ( 
    <div className="navbar">
      <h1>
        Employee Management App
      </h1>
      <div className="navbar__right">
        <div onClick={handleClick} className="navbar__right--button">
          <h3>Add Employee</h3>
        </div>
      </div>
    </div>
   );
}
 
export default Navbar;