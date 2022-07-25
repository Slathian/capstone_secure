import React, { useRef, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';


// Okay so why does it look like this instead of Lexical that I spent a lot of time on?
// I had to scrap it because of a feature breaking bug in Lexical. There was a specific call that SHOULD have worked to get html data and easily display that data
// But when asked, the devs said that currently it is stuck in read only mode and you can't get the data the normal way
// When I tried to do the work around, there was numerous errors that wasted my time over and over and over.
// When I thought I had it working. or at least in a manageble direction, I updated the version and more stuff broke.
// In the end, I had more I needed to do and not enough time to do it
// When asked when the new update will be pushed, the devs said a week after my deadline for this project is due. With that in mind, I decided to scrap it.

// So, what do we have here? A simple simple simple form of a blog that primarily focuses on the use of endpoints and the use of axios.
// Also CORS is a bitch but I got it to work. For now. Hope that doesn't become a major problem down the road...

const CreateBlog = () => {

  const { apiUrl } = useContext(AuthContext);

  //refs
  const titleRef = useRef();
  const bodyRef = useRef();
  const summaryRef = useRef();

  //functions
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(titleRef.current.value, bodyRef.current.value, summaryRef.current.value);
    axios.post(`${apiUrl}/api/insert-blog`, {
      blogsTitle: titleRef.current.value,
      blogsBody: bodyRef.current.value,
      blogsSummary: summaryRef.current.value
    }).then(response => {
      // console.log(response.data);
      navigate('/blog');
    });
  }


  //slate 
  const initialValue = []

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
      <div className="create-blog-wrapper">
        <form className="create-blog" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <div className="title">
              <input type="text" name="title" id="title" placeholder="Title" autoFocus={true} ref={titleRef}/>
            </div>
            
            <div className="summary">
              <textarea name="summary" id="summary" placeholder="Summary" ref={summaryRef}/>
            </div>
            <div className="body">
              <textarea placeholder='Tell your story...' type="text" className="writeInput writeText" ref={bodyRef}/>
            </div>
          </div>
          

          <div className="submit-button">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateBlog;



