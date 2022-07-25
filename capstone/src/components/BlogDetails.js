import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

import AuthContext from '../context/AuthContext';

const BlogDetails = () => {
  //state
  const [blogData, setBlogData] = useState([]);
  const [overlayActive, setOverlayActive] = useState(false);
  const [titleData, setTitleData] = useState('');
  const [summaryData, setSummaryData] = useState('');
  const [bodyData, setBodyData] = useState('');

  //context
  const authContext = useContext(AuthContext);
  const {apiUrl, isAuthenticated, authUID } = authContext;

  //refs
  const titleRef = useRef();
  const bodyRef = useRef();
  const summaryRef = useRef();

  //params
  const { id } = useParams();

  const handleBodyChange = (e) => {
    setBodyData(e.target.value);
  }

  const handleSummaryChange = (e) => {
    setSummaryData(e.target.value);
  }
  const handleTitleChange = (e) => {
    setTitleData(e.target.value);
  }

  const updateBlogpost = async () => {
    await axios.get(`${apiUrl}/api/blogpost/${id}`)
    .then(response => {
      // console.log(response.data);
      setBlogData(...response.data);
      setTitleData(response.data[0].blogsTitle);
      setSummaryData(response.data[0].blogsSummary);
      setBodyData(response.data[0].blogsBody);
    });
  }

  useEffect(() => {
    updateBlogpost();
  }, []);

  useEffect(() => {
  if (!isAuthenticated) {
      setOverlayActive(false);
    }
  }, [handleBodyChange, handleSummaryChange, handleTitleChange, isAuthenticated]);

  const setOverlay = () => {
    setOverlayActive(!overlayActive);
    // console.log(`Overlay is ${overlayActive}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${apiUrl}/api/blogpost-update/${id}`, {
      blogsTitle: titleData,
      blogsBody: bodyData,
      blogsSummary: summaryData,
      authUID: authUID
    }).then(response => {
      // console.log(response.data);
      updateBlogpost();
      setOverlay();
    }).catch(error => {
      console.log(error);
    });
  }

  const body = () => {
    if (overlayActive) {
      return(
      //   <div>
      //     This is the edit overlay. Turn it off here <button onClick={setOverlay}>Exit Edit</button>
      //     <div className="create-blog-wrapper">
      //   <form className="create-blog" onSubmit={handleSubmit}>
      //     <div className="writeFormGroup">
      //       <label htmlFor="fileInput">
      //         Banner Image <i className="fas fa-file-upload"></i>
      //       </label>
      //       <input type="file" name="file" id="fileInput" style={{display:"none"}}/>
      //       <input type="text" name="title" id="title" placeholder="Title" autoFocus={true} ref={titleRef} value={titleData} onChange={handleTitleChange}/>
      //       <textarea name="summary" id="summary" placeholder="Summary" ref={summaryRef} value={summaryData} onChange={handleSummaryChange}/>
      //     </div>
      //     <div className="writeFormGroup">
      //       <textarea  type="text" className="writeInput writeText" ref={bodyRef} value={bodyData} onChange={handleBodyChange} />
      //     </div>

      //     <div className="submit-button">
      //       <button type="submit">Post</button>
      //     </div>
      //   </form>
      // </div>
      //   </div>
      
      <div className="create-blog-wrapper">
        <form className="create-blog" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <div className="title">
            <input type="text" name="title" id="title" placeholder="Title" autoFocus={true} ref={titleRef} value={titleData} onChange={handleTitleChange}/>
            </div>
            
            <div className="summary">
              <textarea name="summary" id="summary" placeholder="Summary" ref={summaryRef} value={summaryData} onChange={handleSummaryChange}/>
            </div>
            <div className="body">
              <textarea  type="text" className="writeInput writeText" ref={bodyRef} value={bodyData} onChange={handleBodyChange} />
            </div>
          </div>
          

          <div className="submit-button">
            <button type="submit">Post</button>
            <button style={{marginLeft: "10px", background:"#ec2f2f"}} onClick={setOverlay}>Cancel</button>
          </div>
        </form>
      </div>
      )
    } else {
      return(  
      <div className="blog-post-wrapper">
        <div className="blog-post">
          <div className="blog-post-title">
            <div>
              <h1>{isAuthenticated ? <i style={{cursor: "pointer", marginRight: "5px", fontSize: "0.9em", color: "#00a0e1ff"}} onClick={setOverlay} class="fa-solid fa-pen-to-square"></i> : null} {blogData.blogsTitle}</h1>
            </div>
            <div className="blog-post-date">
              {blogData.blogsDate?.slice(0, 10)}
            </div>
          </div>
          <div className="horizontal-line-1px" />
          <div className="blog-post-body">
            <h1>{blogData.blogsBody}</h1>
          </div>
        </div>
      </div>
      )};
  }

  return(
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
    }}>
      {body()}
    </motion.div>
  )
}


export default BlogDetails;