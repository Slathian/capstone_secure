import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// import context
import AuthContext from '../context/AuthContext';

const NavBar = () => {

const { user, isAuthenticated, setAuthUID } = useContext(AuthContext);

return (
    <div className="navBar">

        <div className="navBar-wrapper">
            <div className="links">
                <div className="link">
                    <Link to="/">Home</Link>
                </div>
                <div className="link">
                    <Link to="/portfolio"> Portfolio </Link>
                {/* <div className="link" style={{'font-size': '1.2em'}}> */}
                    {/* <Link to="/portfolio"> <i class="fa-solid fa-grip"></i> </Link> */}
                </div>
                <div className="link">
                    <Link to="/blog"> Blog </Link>
                </div>
                {isAuthenticated ? <Link to="blog-post">Create Post</Link> : null}
            </div>
        </div>

        <div className="navBar-name-wrapper">
            <div className="navBar-name" key={"nameSpace"}>
                {/* Josh Angelo {isAuthenticated ? `(${user})` : null} */}
                Josh Angelo
                {isAuthenticated ? <i onClick={() => setAuthUID(null)} style={{marginRight: "20px", padding:" 20px", cursor: "pointer"}} class="fa-solid fa-right-from-bracket"></i> : null}
            </div>
            <div className="logout-button">
                
            </div>
        </div>
    </div>
    );
};

export default NavBar;