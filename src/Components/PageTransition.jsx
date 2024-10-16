// src/components/PageTransition.jsx
"use client";

import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }} // Starting state
      animate={{ opacity: 1, x: 0 }}    // Ending state
      exit={{ opacity: 0, x: -100 }}     // Exit state
      transition={{ duration: 0.5 }}      // Transition duration
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
