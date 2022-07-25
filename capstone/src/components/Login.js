import React, {useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { sha256 } from 'js-sha256';

//context import
import AuthContext from '../context/AuthContext';

const Login = () => {

  const { apiUrl, isAuthenticated, user, setUser, setIsAuthenticated, authUID, setAuthUID } = useContext(AuthContext);

  const usernameRef = useRef();
  const passwordRef = useRef();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(usernameRef.current.value, sha256(passwordRef.current.value));
  // };
  //This was a test to see if I could get the user to log in. renamed it to handleSubmit. Kept the old one for reference.

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordEncrypted = sha256(passwordRef.current.value);
    axios.post(`${apiUrl}/api/login`, {
      username: usernameRef.current.value,
      password: passwordEncrypted
    }).then(response => {
      // console.log(response.data);
      setAuthUID(response.data);
      setUser(`${usernameRef.current.value}`);
    })
  }

  return (
    <motion.div
    initial={{
      opacity: 0,
      y: -100
    }}
    animate={{
      opacity: 1,
      y: 0
    }}
    exit={{
      opacity: 0,
      y: 100,
      transition: {
        duration: 0.4
      }
    }}
    >
      <div className="login-wrapper">
        <div className="login-container">
          <h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username"> Login</label>
              <input placeholder='Username' type="text" id="username" ref={usernameRef} required/>
              {/* <label htmlFor="password">Password</label> */}
              <input placeholder='Password' type="password" id="password" ref={passwordRef} required minLength="6"/>
              <button type="submit">Login</button>
            </form>
          </h1>
        </div>

        {/* <div className="userTestingButtons">
          <button onClick={() => {
            setUser("Foo");
          }
          }>Foo</button>
          <button onClick={() => {
            setUser("Bar");
          }
          }>Bar</button>
          <button onClick={() => {
            setUser(null);
            setAuthUID(null);
          }
          }>Logout</button>

          <button onClick={loginTest}>Login Test</button>
        </div> */}
        {/* Dont think I need the testing buttons anymore but keeping them for reference just in case */}

      </div>
    </motion.div>
  );
};

export default Login;