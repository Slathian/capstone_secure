import React, { useContext } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

// Routes
import Portfolio from './Portfolio';
import Home from './Home';
import NotFoundPage from './NotFoundPage';
import Blog from './Blog';
import Login from './Login';
import BlogDetails from './BlogDetails';
import CreateBlog from './CreateBlog';

// Framer Motion
import { AnimatePresence } from 'framer-motion';


const AnimatedRoutes = () => {

  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();


  return (
    <AnimatePresence
    initial={true}
    exitBeforeEnter={true}>

        <Routes location={location} key={location.pathname}>
          <Route path="*" element={<NotFoundPage/>} />
          <Route exact path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/blog/:id" element={<BlogDetails/>} />

          {/* protected Routes / navigation listener */}
          {isAuthenticated ? <Route path="admin-login" element={<Navigate to="/"/>}/> : <Route path="/admin-login" element={<Login/>} />}
          {isAuthenticated ? <Route path="/blog-post" element={<CreateBlog/>} />: null}
        </Routes>
 
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

