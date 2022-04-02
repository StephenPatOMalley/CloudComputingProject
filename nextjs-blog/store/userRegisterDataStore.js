import { createContext, useState, useEffect } from 'react';

const initialUserDataState = {
    userName: '',
    userEmail: '',
    userPassword: ''
}

const UserRegisterDataContext = createContext(initialUserDataState);

export function UserRegisterDataContextProvider(props) {
    const [dataUserObj, setDataUserObj] = useState(UserRegisterDataContext)

    useEffect(() => {
        fetch('api/getUserData')
        .then((res) => res.json())
        .then((data) => {
            setDataUserObj(data)
        })
    }, []);

    // see https://nextjs.org/docs/basic-features/data-fetching/client-side
    function getUser() {
        console.log(dataUserObj)
        return dataUserObj
    }

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
        getUser: getUser,
        setUser: setUser
    };

    return (
        <UserRegisterDataContext.Provider value={context}>
            {props.children}
        </UserRegisterDataContext.Provider>
    );
}

export default UserRegisterDataContext;