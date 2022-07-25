import React, { useState } from 'react';
import { motion } from 'framer-motion'

import photo1 from '../images/portfolioDemo/photo1.jpg';
import photo2 from '../images/portfolioDemo/photo2.jpg';
import photo3 from '../images/portfolioDemo/photo3.jpg';
import photo4 from '../images/portfolioDemo/photo4.jpg';
import photo5 from '../images/portfolioDemo/photo5.jpg';
import photo6 from '../images/portfolioDemo/photo6.jpg';
import photo7 from '../images/portfolioDemo/photo7.jpg';
import photo8 from '../images/portfolioDemo/photo8.jpg';

// Yes I understand this is buggy but will have to do with current time constraints
// Had to remove the motion from the portfolio due to laggy rendering

// Plans for future development:
// 1. create dynamic tile sizes
// 2. create dynamic tile content
// 3. create dynamic tile background images
// 4. create dynamic state for style changes within the tiles (e.g. hover, click, etc.)
// 5. auto generate tile content based on github repos
// 6. play with framer motion more and have them drop into the page one by one
// 7. make the transitions smooth with framer motion down the road
// 8. make admin access to edit the portfolio content instead of hard coding it

// why have a I not done this yet? I took 3 weeks trying to get Lexical to work and when I almost got it working then I updated the version and broke everthing and have not been able to fix it or even revert the changes...

//Why is this so convoluted? I wanted to play around with inline styles as normally I do everything in scss usually. So really this is a learning moment for me.

const Portfolio = () => {

  // the reason this is state instead of just an object is because is because I am future proofing for when I make this dynamic
  const [tileStateInitial, setTileStateInitial] = useState([
    {
      background: `url('${photo1}')`,
      backgroundSize: "cover",
    },
    {
      background: `url('${photo2}')`,
      backgroundSize: "cover"
    },
    {
      background: `url('${photo3}')`,
      backgroundSize: "cover"
    },
    {
      background: `url('${photo4}')`,
      backgroundSize: "cover"
    },
    {
      background: `url('${photo5}')`,
      backgroundSize: "cover"
    },
    {
      background: `url('${photo6}')`,
      backgroundSize: "cover"
    },
    {
      background: `url('${photo7}')`,
      backgroundSize: "cover"
    },
    {
      background: `url('${photo8}')`,
      backgroundSize: "cover"
    }
  ]);

  const redirectToGithub = (e) => {
    e.preventDefault();
    window.open('https://github.com/Slathian', '_blank');
  }


  const handleMouseEnter = (e) => {
    // const _tileTarget = e.target.className.slice(-1);
    // console.log(_tileTarget);
    e.target.style.background = 'black';

    e.target.childNodes[0].style.display = 'block';
  }

  const handleMouseLeave = (e) => {
    const _tileTarget = e.target.className.slice(-1);
    // console.log(_tileTarget);
    e.target.style.background = tileStateInitial[_tileTarget].background;
    e.target.style.backgroundSize = tileStateInitial[_tileTarget].backgroundSize;
    // console.log(tileStateInitial[_tileTarget].background)

    e.target.childNodes[0].style.display = 'none';
  }

  return (
    <motion.div className="portfolio-wrapper"
    
    // initial={{
    //   opacity: 0,
    //   y: -100
    // }}
    // animate={{
    //   opacity: 1,
    //   y: 0
    // }}
    // exit={{
    //   opacity: 0,
    //   y: 100,
    //   transition: {
    //     duration: 0.4
    //   }
    // }}
    >

    <div className="nav-spacer"></div>
      <h1>Portfolio Tile Under Development</h1>
      <div className="portfolio-container">
        <div className="tiles-wrapper">
          <motion.div className="tile medium"
          >
            <div className="tile-content 0" onClick={redirectToGithub} style={tileStateInitial[0]} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="tile-content-text" style={{display: "none"}}>
                <div className="tile-content-title">
                  <h1>Title</h1>
                </div>
                <div className="tile-content-description">
                  <p>Description</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="tile large">
            <div className="tile-content 1" onClick={redirectToGithub} style={tileStateInitial[1]} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="tile-content-text" style={{display: "none"}}>
                <div className="tile-content-title">
                  <h1>Title</h1>
                </div>
                <div className="tile-content-description">
                  <p>Description</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="tile medium">
            <div className="tile-content 2" onClick={redirectToGithub} style={tileStateInitial[2]} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="tile-content-text" style={{display: "none"}}>
                <div className="tile-content-title">
                  <h1>Title</h1>
                </div>
                <div className="tile-content-description">
                  <p>Description</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="tile small">
            <div className="tile-content 3" onClick={redirectToGithub} style={tileStateInitial[3]} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="tile-content-text" style={{display: "none"}}>
                <div className="tile-content-title">
                  <h1>Title</h1>
                </div>
                <div className="tile-content-description">
                  <p>Description</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="tile tall">
            <div className="tile-content 4" onClick={redirectToGithub} style={tileStateInitial[4]} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="tile-content-text" style={{display: "none"}}>
                <div className="tile-content-title">
                  <h1>Title</h1>
                </div>
                <div className="tile-content-description">
                  <p>Description</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="tile wide">
            <div className="tile-content 5" onClick={redirectToGithub} style={tileStateInitial[5]} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="tile-content-text" style={{display: "none"}}>
                <div className="tile-content-title">
                  <h1>Title</h1>
                </div>
                <div className="tile-content-description">
                  <p>Description</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="tile medium">
            <div className="tile-content 6" onClick={redirectToGithub} style={tileStateInitial[6]} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="tile-content-text" style={{display: "none"}}>
                <div className="tile-content-title">
                  <h1>Title</h1>
                </div>
                <div className="tile-content-description">
                  <p>Description</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="tile wide">
            <div className="tile-content 7" onClick={redirectToGithub} style={tileStateInitial[7]} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="tile-content-text" style={{display: "none"}}>
                <div className="tile-content-title">
                  <h1>Title</h1>
                </div>
                <div className="tile-content-description">
                  <p>Description</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    <div className="nav-spacer"></div>
    </motion.div>
  );
};

export default Portfolio;