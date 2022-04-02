import { createContext, useState, useEffect } from 'react';

const initialAccountDataState = {
    userName: '',
    userSalary: 0
}

const AccountDataContext = createContext(initialAccountDataState);

export function AccDataContextProvider(props) {
    const [dataAccObj, setDataAccObj] = useState(initialAccountDataState)


    useEffect(() => {
        fetch('api/getAccountData')
        .then((res) => res.json())
        .then((data) => {
            setDataAccObj(data)
        })
    }, []);

    function getAccount() {
        return dataAccObj
    }

    async function setAccount(data)  {
        const response = await fetch('api/setAccountData', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        });
    }

    const context = {
        getAccount: getAccount,
        setAccount: setAccount
    };

    return (
        <AccountDataContext.Provider value={context}>
            {props.children}
        </AccountDataContext.Provider>
    );
}

export default AccountDataContext;