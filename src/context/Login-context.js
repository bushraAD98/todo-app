import React, { useEffect, useState } from "react";
import base64 from 'base-64';
import superagent from 'superagent';
import jwt from 'jwt-decode';
import cookie from 'react-cookies';


const API = `https://mohammad-auth-api.herokuapp.com/`;
export const LoginContext = React.createContext();

export default function LoginProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});


    const login = async (username, password) => {
        const response = await superagent.post(`${API}signin`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        validateMyUser(response.body)
    }

    const validateMyUser = (data) => {
        if (data) {
            const validUser = jwt(data.token);
            if (validUser) {
                setLoginstate(true, data);
                cookie.save('userData', data);
            } else {
                setLoginstate(false, {})
            }
        } else {
            setLoginstate(false, {})
        }

    }
    // async function signup(username,password,role){
    //     const response = await superagent.post(`${API}signup`).send({username:username,password:password,role});
    //     console.log(response.body);
    // }

    const setLoginstate = (isLogged, userData) => {
        setLoggedIn(isLogged);
        setUser(userData);
    }

    const logout = () => {
        setLoggedIn(false);
        setUser({});
        cookie.remove('userData');
    }

    useEffect(() => {
        const myUserInfo = cookie.load('userData');
        validateMyUser(myUserInfo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    const canDo = (capability) => {
        return user?.actions?.includes(capability);
    }

    const state = {
        loggedIn: loggedIn,
        user: user,
        login: login,
        logout: logout,
        canDo: canDo,
        // signup:signup
    }


    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}