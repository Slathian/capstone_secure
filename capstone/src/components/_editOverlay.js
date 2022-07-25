import React, { useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const editOverlay = () => {
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
    }}
    >
      <div className="edit-overlay">
        <div className="edit-overlay-content">
          <div className="edit-overlay-title">
            <h1>Edit Blog</h1>
          </div>
          <div className="edit-overlay-body">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder="Title" autoFocus={true}/>
              </div>
              <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <textarea name="summary" id="summary" placeholder="Summary"/>
              </div>
              <div className="form-group">
                <label htmlFor="body">Body</label>
                <textarea name="body" id="body" placeholder="Body"/>
              </div>
              <div className="form-group">
                <label htmlFor="fileInput">
                  Banner Image <i className="fas fa-file-upload"></i>
                </label>
                <input type="file" name="file" id="fileInput" style={{display:"none"}}/>
              </div>
              <div className="form-group">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default editOverlay;