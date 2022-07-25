import React from 'react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div>
      <motion.div className="notFound-wrapper" 
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
        y: 100
      }}
      >
        <h1>
          Sorry looks like this page does not exist. <br/>
          Try pressing the home button to go back to the home page.
        </h1>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;