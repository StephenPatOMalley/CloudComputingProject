import { createContext, useState, useEffect } from 'react';

const initialUserDataState = {
    userName: '',
    userEmail: '',
    userPassword: ''
}

const UserRegisterDataContext = createContext(initialUserDataState);

export function UserRegisterDataContextProvider(props) {

    async function setUser(data)  {
        const response = await fetch('api/setUserData', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        });
    }

    const context = {
        setUser: setUser
    };

    return (
        <UserRegisterDataContext.Provider value={context}>
            {props.children}
        </UserRegisterDataContext.Provider>
    );
}

export default UserRegisterDataContext;