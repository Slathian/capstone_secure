import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './Main.scss';
import NavBar from './components/NavBar';
import AnimatedRoutes from './components/AnimatedRoutes';

// context imports
import { AuthProvider } from './context/AuthContext';



function App() {
  
  return (
      <AuthProvider>
          <Router> 
            <div className="App">

              <NavBar/>
              <div className="nav-spacer"></div>

              <AnimatedRoutes/>
              
            </div>
          </Router>
      </AuthProvider>
  );
}

export default App;
