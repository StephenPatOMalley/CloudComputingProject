import { useRef, useContext } from "react";
import accountDataContext from "../store/accountDataStore.js";
import classes from './Account.module.css';

function Account() {
  const dataCtx = useContext(accountDataContext);

  const accountNameInputRef = useRef();
  const accountSalaryInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredaccountName = accountNameInputRef.current.value;
    const enteredaccountSalary = accountSalaryInputRef.current.value;

    const accountData = {
      name: enteredaccountName,
      salary: enteredaccountSalary,
    };

    dataCtx.setAccount(accountData)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='account name'>Employee Name</label>
        <input type='text' required id='accountName' ref={accountNameInputRef} />
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