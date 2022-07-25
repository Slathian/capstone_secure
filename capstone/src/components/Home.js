import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import logo from '../images/logo.png';


const Home = () => {

  
  const [words, setWords] = useState(" Simplicity");
  

  useEffect(()  => {
    const interval = setInterval(() => {
      // console.log("interval is being run")

      if (words === " Simplicity") {
        // console.log('Chaning words to Design');
        setWords(" Design");
      }
      else if (words === " Design") {
        // console.log('Chaning words to Inspired Learning');
        setWords(" Inspired Learning");
      }
      else if (words === " Inspired Learning") {
        // console.log('Chaning words to Simplicity');
        setWords(" Simplicity");
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <motion.div className="homepage"
    initial={{ 
      backgroundColor: "#e6e6e6",
      opacity: 0,
      y: -50
    }}
    animate={{
      backgroundColor: "#ffffff",
      opacity: 1,
      y: 0
    }}
    exit={{
      backgroundColor: "#e6e6e6",
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.4
      }
    }}
    >
      <div className="homepage-container">
        
        <div className="homepage-image">
          <img src={logo} alt="logo" />
        </div>

        <div className="homepage-text-wrapper">
          <motion.div className="homepage-text"
          >
          <h1>
            Step into my world of {words ? null : " Simplicity"} 
            <motion.span

              animate={{
                opacity: [0, 1, 1, 1, 1, 1, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}>
              {words}
            </motion.span>
          </h1>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;