import {createContext, useState, useEffect } from 'react';
import axios from 'axios';

// is ANY of this practical? I have no clue nobody taught me how to do this or create APIs so here we are.
// why not use OAuth? Becuase how else am I going to properly learn how to use APIs if I don't create convoluted programs like this and refactor later?
// I learn by doing and I know I am going to continue to learn as I later refactor and make it more efficient.

// If you are seriously asking about this I really can't tell you anything other than it works and it was fun to build.

const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const apiUrl = 'REMOVED FOR SECURITY REASONS';
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUID, setAuthUID] = useState(null);

  useEffect(() => {
    // console.log('runningAuthCheck');
    const apiAuthDoubleCheck = async () => {
      await axios.post(`${apiUrl}/api/authCheck`, {
        authUID: authUID
      }).then(res => {
        // console.log(res.data);


        // LOOK. I KNOW THIS IS A BAD IDEA. I AM NOT SURE IF I SHOULD BE DOING THIS OR NOT. I AM NOT A CYBER SECURITY EXPERT IM SORRY!
        if (res.data === 'True') {
          setIsAuthenticated(true);
        }

        if (res.data === 'False') {
          setIsAuthenticated(false);
        }

      }).catch(err => {
        console.log(err);
      });
    };
    apiAuthDoubleCheck();

    // if (authUID === 'UID FROM DATA BASE WAS HERE AND NOW IS NO LONGER ABLE TO BE SEEN') {
    //   setIsAuthenticated(true);
    // } else {
    //   setIsAuthenticated(false);
    // }

  }, [apiUrl, user, isAuthenticated, authUID, setIsAuthenticated, setAuthUID, setUser]);

  

  return(
    <AuthContext.Provider value={{apiUrl, user, setUser, isAuthenticated, setIsAuthenticated, authUID, setAuthUID}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;