import { createContext, useState, useEffect } from 'react';

const initialEmployeeDataState = {
    userName: '',
    userAge: 0,
    userRole: ''
}

const EmployeeDataContext = createContext(initialEmployeeDataState);

export function EmpDataContextProvider(props) {
    const [dataEmpObj, setDataEmpObj] = useState(initialEmployeeDataState)

    useEffect(() => {
        fetch('api/getEmployeeData')
        .then((res) => res.json())
        .then((data) => {
            setDataEmpObj(data)
        })
    }, []);

    // see https://nextjs.org/docs/basic-features/data-fetching/client-side
    function getEmployee() {
        return dataEmpObj
    }

    async function setEmployee(data)  {
        const response = await fetch('api/setEmployeeData', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        });
    }

    const context = {
        getEmployee: getEmployee,
        setEmployee: setEmployee
    };

    return (
        <EmployeeDataContext.Provider value={context}>
            {props.children}
        </EmployeeDataContext.Provider>
    );
}

export default EmployeeDataContext;