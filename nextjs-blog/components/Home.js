import React from "react";
import { useRef, useContext } from "react";
import accountDataContext from "../store/accountDataStore.js";
import employeeDataContext from "../store/employeeDataStore.js";

import classes from './Home.module.css'

function Home() {
    const dataAccCtx = useContext(accountDataContext)
    const dataEmpCtx = useContext(employeeDataContext)
    const employeeData = dataEmpCtx.getEmployee()
    const accountData = dataAccCtx.getAccount()

    // https://bobbyhadz.com/blog/javascript-typeerror-object-map-is-not-a-function
    return (
        <div className={classes.splitScreen}>
            <div className={classes.topPane}>
                <table className={classes.table}>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Role</th>
                </tr>
                {Object.keys(employeeData).map(key => {
                    return (
                    <tr key={key}>
                        <td>{employeeData[key].userName}</td>
                        <td>{employeeData[key].userAge}</td>
                        <td>{employeeData[key].userRole}</td>
                    </tr>
                    )
                })}
                </table>
            </div>
            <div className={classes.bottomPane}>
            <table className={classes.table}>
                <tr>
                    <th>Name</th>
                    <th>Salary</th>
                </tr>
                {Object.keys(accountData).map(key => {
                    return (
                    <tr key={key}>
                        <td> {accountData[key].userName}</td>
                        <td> € {accountData[key].userSalary}</td>
                    </tr>
                    )
                })}
                </table>
            </div>
        </div>
    );
}

export default Home;