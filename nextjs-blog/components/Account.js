import { useRef, useContext, useState } from "react";
import accountDataContext from "../store/accountDataStore.js";
import UserRegisterDataContext from "../store/userRegisterDataStore.js";
import classes from './Account.module.css';

import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";

function Account() {
  const dataCtx = useContext(accountDataContext)
  const dataUserCtx = useContext(UserRegisterDataContext)
  let userData = dataUserCtx.getUser()

  const accountSalaryInputRef = useRef()

  const [value, setValue] = useState('')

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredaccountName = value.userName
    const enteredaccountSalary = accountSalaryInputRef.current.value

    const accountData = {
      userName: enteredaccountName,
      userSalary: enteredaccountSalary,
    };

    dataCtx.setAccount(accountData)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='account name'>Account Name</label>
        <Combobox
          placeholder= "Select account"
          data = {userData}
          textField='userName'
          type = 'text'
          required id= 'accountName'
          value={value}
          onChange = {value => setValue(value)}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='account Salary'>Employee Salary</label>
        <input type='number' required id='accountSalary' ref={accountSalaryInputRef} />
      </div>
      <div className={classes.actions}>
        <button>Add Account</button>
      </div>
    </form>
  );
}
  
  export default Account;