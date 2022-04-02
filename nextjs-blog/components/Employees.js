import { useRef, useContext, useState } from "react";
import EmployeeDataContext from "../store/employeeDataStore.js";
import UserRegisterDataContext from "../store/userRegisterDataStore.js";
import classes from './Employees.module.css';

import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";

function Employees() {
  const dataEmployeeCtx = useContext(EmployeeDataContext)
  const dataUserCtx = useContext(UserRegisterDataContext)
  let userData = dataUserCtx.getUser()

  const employeeAgeInputRef = useRef();
  const employeeRoleInputRef = useRef();

  const [value, setValue] = useState('')

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredemployeeName = value.userName;
    const enteredemployeeAge = employeeAgeInputRef.current.value
    const enteredemployeeRole = employeeRoleInputRef.current.value

    const employeeData = {
      userName: enteredemployeeName,
      userAge: enteredemployeeAge,
      userRole: enteredemployeeRole,
    };

    dataEmployeeCtx.setEmployee(employeeData)
  }

  // https://www.npmjs.com/package/react-dropdown-select
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='employee name'>Employee Name</label>
        <Combobox
          placeholder= "Select Employee"
          data = {userData}
          textField='userName'
          type = 'text'
          required id= 'employeeName'
          value={value}
          onChange = {value => setValue(value)}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='employee age'>Employee Age</label>
        <input type='number' required id='employeeAge' ref={employeeAgeInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='employee Role'>Employee Position</label>
        <input type='text' required id='employeeRole' ref={employeeRoleInputRef} />
      </div>
      <div className={classes.actions}>
        <button>Add Employee</button>
      </div>
    </form>
  );
}

export default Employees;
