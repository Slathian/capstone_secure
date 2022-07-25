import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import BlogCard from './BlogCard';

import AuthContext from '../context/AuthContext';

const Blog = () => {

  const { apiUrl } = useContext(AuthContext);

  const [testData, setTestData] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/api/pull-all-blogs`).
    then(response => {
      setTestData(response.data);
    });
  }, []);

  return (
    <div>
      <motion.div className="blogMainPage-wrapper"
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
        <div className="blog-top-banner">
          <div className="blog-top-banner-text">
            <h1>Welcome to my learning space</h1>
          </div>
        </div>

        <div className="cards-wrapper">
          <div className="horizontal-line-1px" />

          {/* Map the data here into different Cards */}
          {testData.map((blog, index) => {
            return (
              <div className="blog-card" key={index}>
              <BlogCard setTestData = {setTestData} key={index} blog={blog}/>
              </div>
            );
          }
          )}
        </div>

      </motion.div>

    </div>
  );
};

export default Blog;