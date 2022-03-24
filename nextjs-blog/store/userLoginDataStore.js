import { createContext, useState, useEffect } from 'react';

const initialUserDataState = {
    userName: '',
    userPassword: ''
}

const UserLoginDataContext = createContext(initialUserDataState);

export function UserLoginDataContextProvider(props) {

    // see https://nextjs.org/docs/basic-features/data-fetching/client-side
    function confirmLogin() {
        return dataEmpObj
    }

    async function getLogin(data)  {
        const response = await fetch('api/getLoginData', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        });
        console.log(response.statusText)
    }

    const context = {
        getLogin: getLogin
    };

    return (
        <UserLoginDataContext.Provider value={context}>
            {props.children}
        </UserLoginDataContext.Provider>
    );
}

export default UserLoginDataContext;