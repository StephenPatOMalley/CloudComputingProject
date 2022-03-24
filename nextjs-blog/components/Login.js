import { useRef, useContext } from "react";
import UserLoginDataContext from "../store/userLoginDataStore";
import classes from './Login.module.css';

function Login() {
  const dataCtx = useContext(UserLoginDataContext);

  const nameRef = useRef()
  const passwordRef = useRef()


  const submitHandler = (event) => {
    event.preventDefault();

    const enterednameRef = nameRef.current.value;
    const enteredpasswordRef = passwordRef.current.value;

    const userData = {
      userName: enterednameRef,
      userPassword: enteredpasswordRef,
    };

    dataCtx.getLogin(userData)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='User Name'>User Name</label>
        <input type='text' required id='userName' ref={nameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='User Password'>User Password</label>
        <input type='password' required id='userPassword' ref={passwordRef} />
      </div>
      <div className={classes.actions}>
        <button>Login</button>
      </div>
    </form>
  );
}

export default Login;