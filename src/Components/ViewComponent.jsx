"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';
import styles from './ViewComponent.module.css';
import TableComponent from './TableComponent'; // Adjust path as needed
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence

const ViewComponent = () => {
  const [activeContainer, setActiveContainer] = useState('ViewComponent'); // State to manage active container

  const handleBack = () => {
    setActiveContainer('TableComponent'); // Set active container to TableComponent
  };

  const updateddata = {
    "Apply Phone": "123-456-7890",
    "Product": "Loan",
     "Partner ID": "ABC123",
    "Apply Time": "2024-09-12 15:14:17",
    "Status": "Data Submitted",
    "API Response Content": "Sample API response",
    "Abandoning Reason": "",
    "Next Action Date": "",
    "DSA": "MoneyTap",
    "Sub DSA": "",
    "Agent User ID": "4678543",
    "SUB Agent User ID": "",
    "Operation ID": "",
    "Request Meta Data": "",
    "Lead Type": "Bronze",
    "Monthly Salary": "23000.00",
    "Trace Count": "0",
    "Disbursed Amount": "",
    "URL": "",
    "Offline": "",
    "Recurring": "",
    "Create Time": "2024-09-12 15:14:17",   
    "Last Update Time": ""
  };

  return (
    <>
      <AnimatePresence>
        {activeContainer === 'TableComponent' && (
          <motion.div 
            key="table" // Unique key for Framer Motion
            initial={{ x: '100%' }} // Start off-screen to the right
            animate={{ x: '0%' }} // Slide in from the right
            exit={{ x: '100%' }} // Slide out to the right
            transition={{ duration: 0.5 }} // Duration of the transition
          > 
            <TableComponent />
          </motion.div>
        )}

        {activeContainer === 'ViewComponent' && (
          <motion.div 
            key="view" // Unique key for Framer Motion
            initial={{ x: '0%' }} // Start on screen
            animate={{ x: '0%' }} // Stay on screen
            exit={{ x: '100%' }} // Slide out to the left when going back
            transition={{ duration: 0.5 }} // Duration of the transition
          >
            <div className={styles.container}>
              {/* Header Section */}
              <div className={styles.headerContainer}>
                <h1 className={styles.header1}>Record Details</h1>
                <div className={styles.breadcrumbs}>
                  <span>Apply Record</span> &gt;
                  <span onClick={handleBack}>Apply Record List</span> &gt;
                  <span>Record Details</span>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.table1}>
                  <tbody>
                    {Object.entries(updateddata).map(([key, value]) => (
                      <tr key={key}>
                        <td className={styles.heading}>{key}:</td>
                        <td className={styles.data}>{value || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Back Button */}
              <div className={styles.stickyBackButtonContainer}>
                <button 
                  onClick={handleBack}  // Call the handleBack function when clicked
                  className={styles.stickyBackButton}
                >
                  &#8592;
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ViewComponent;
