import { useRef, useContext } from "react"
import UserRegisterDataContext from "../store/userRegisterDataStore";
import classes from './Login.module.css';


function SignUp() {
  const dataCtx = useContext(UserRegisterDataContext);

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()


  const submitHandler = (event) => {
    event.preventDefault();

    const enterednameRef = nameRef.current.value;
    const enteredemailRef = emailRef.current.value;
    const enteredpasswordRef = passwordRef.current.value;

    const userData = {
      userName: enterednameRef,
      userEmail: enteredemailRef,
      userPassword: enteredpasswordRef,
    };

    dataCtx.setUser(userData)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='User Name'>User Name</label>
        <input type='text' required id='userName' ref={nameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='User Email'>User Email</label>
        <input type='email' required id='userEmail' ref={emailRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='User Password'>User Password</label>
        <input type='password' required id='userPassword' ref={passwordRef} />
      </div>
      <div className={classes.actions}>
        <button>Sign Up</button>
      </div>
    </form>
  );
}

export default SignUp;