import { useRef, useContext } from "react";
import accountDataContext from "../store/accountDataStore.js";
import employeeDataContext from "../store/employeeDataStore.js";

function Home() {
    const dataAccCtx = useContext(accountDataContext)
    const dataEmpCtx = useContext(employeeDataContext)
    let accountData = dataAccCtx.getAccount()
    let employeeData = dataEmpCtx.getEmployee()
    console.log(accountData, employeeData)


    return (
        <div>
            <table>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Name</th>
                <th>Age</th>
            </tr>
            {data.map((val, key) => {
                return (
                <tr key={key}>
                    <td>{val.name}</td>
                    <td>{val.age}</td>
                    <td>{val.gender}</td>
                </tr>
                )
            })}
            </table>
        </div>
        );
}
  
export default Home;