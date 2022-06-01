import  { useState , useContext } from "react";

import {LoginContext} from '../context/Login-context';
export default function Login(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const login = useContext(LoginContext)
    function handleSubmit(e) {
        e.preventDefault();
       login.login(username, password);
      }

    return (

<form action='' onSubmit={handleSubmit}>
              <input
                style={{ marginRight: 5 }}
                type='text'
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <input
                placeholder='password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginRight: 5 }}
                required
              />
              <button type='submit' style={{ height: '50%' }} >
                Log in
              </button>
            </form>




    )

}