import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const BlogCard = (props) => {

  const { apiUrl, isAuthenticated, authUID } = useContext(AuthContext);

  const  { blog }  = props;

  // console.log(blog);

  const onDelete = () => {
    axios.get(`${apiUrl}/api/pull-all-blogs`).
    then(response => {
      // console.log(response.data);
      props.setTestData(response.data);
    });
  }

  const deletePost = () => {
    axios.delete(`${apiUrl}/api/delete-blog/${blog.blogsID+"-"+authUID}`, {
    })
    .then(response => {
      onDelete();
    }
    ).catch(error => {
      console.log(error);
    }
    );
  }

  return (
    <div className='blog-card-item'>
      <div className="card-title">
        <div className='title-link'>
          <h1>{<Link to={`/blog/${blog.blogsID}`}>{blog.blogsTitle}</Link>}</h1>
        </div>
        <div className='blog-card-date'>
          <div className="delete">
            {isAuthenticated ? <i style={{cursor: "pointer", marginRight: "5px", color: "red"}} class="fa-solid fa-circle-minus" onClick={deletePost}></i> : null}
          </div>
          <div className="date">
            {blog.blogsDate?.slice(0, 10)}
          </div>
          
        </div>
      </div>

      <div className="card-body">
        <h1>{blog.blogsSummary}{/*... Read more <Link to={`/blog/${blog.blogsID}`}>here</Link>*/}</h1>
      </div>
      
    </div>
  );
};

export default BlogCard;