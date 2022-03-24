import { useRef, useContext } from "react";
import employeeDataContext from "../store/employeeDataStore.js";
import classes from './Employees.module.css';

function Employees() {
  const dataCtx = useContext(employeeDataContext);

  const employeeNameInputRef = useRef();
  const employeeAgeInputRef = useRef();
  const employeeRoleInputRef = useRef();


  const submitHandler = (event) => {
    event.preventDefault();

    const enteredemployeeName = employeeNameInputRef.current.value;
    const enteredemployeeAge = employeeAgeInputRef.current.value;
    const enteredemployeeRole = employeeRoleInputRef.current.value;

    const employeeData = {
      name: enteredemployeeName,
      age: enteredemployeeAge,
      role: enteredemployeeRole,
    };

    dataCtx.setEmployee(employeeData)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='employee name'>Employee Name</label>
        <input type='text' required id='employeeName' ref={employeeNameInputRef} />
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
