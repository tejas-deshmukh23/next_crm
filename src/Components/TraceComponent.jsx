// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone } from '@fortawesome/free-solid-svg-icons';
// import styles from './TraceComponent.module.css';
// import TableComponent from './TableComponent';
// import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence

// const formatDate = (dateStr) => {
//   if (!dateStr || isNaN(new Date(dateStr).getTime())) {
//     return '';
//   } 

//   const date = new Date(dateStr);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
//   const seconds = String(date.getSeconds()).padStart(2, '0');
//   const [activeOption, setActiveOption] = useState(null);
//   const [activeSubOption, setActiveSubOption] = useState(null);
//   const [showApplyRecordsContent, setShowApplyRecordsContent] = useState(false);

//   return `${day}-${month}-${year} T ${hours}:${minutes}:${seconds}`;
// };

// const TraceComponent = () => {
//   const router = useRouter();
//   const [activeOption, setActiveOption] = useState(null);
//   const [activeContainer, setActiveContainer] = useState('TraceComponent'); // State to manage active container
//   const [formData, setFormData] = useState({
//     tracer: '',
//     calledNumber: '',
//     content: '',
//     traceTime: '',
//     abandoningReason: '',
//     callDisposition: '',
//     subCallDisposition: '',
//     nextActionDate: '',
//     disbursementAmount: '',
//     status: '',
//   });

//   const [actionCommunication, setActionCommunication] = useState([]);
//   const [applicationInfo, setApplicationInfo] = useState({
//     product: 'mPokket',
//     client: 'ROSHAN RATHOD',
//     phoneNumber: '7057204153',
//     applyTime: '2024-09-10 15:04:17',
//     currentStatus: 'Data Submitted',
//     nextActionDate: '',
//   });

//   const [showApplyRecordsContent, setShowApplyRecordsContent] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const now = new Date();
//     const formattedTraceTime = formatDate(now.toISOString());

//     const newLogEntry = {
//       ...formData,
//       traceTime: formattedTraceTime,
//     };

//     setActionCommunication(prev => [newLogEntry, ...prev]);
//     setApplicationInfo(prev => ({
//       ...prev,
//       currentStatus: formData.status || prev.currentStatus,
//       nextActionDate: formData.nextActionDate || prev.nextActionDate,
//     }));

//     setFormData({
//       tracer: '',
//       calledNumber: '',
//       content: '',
//       traceTime: '',
//       abandoningReason: '',
//       callDisposition: '',
//       subCallDisposition: '',
//       nextActionDate: '',
//       disbursementAmount: '',
//       status: '',
//     });
//   };

//   const handleCall = (phoneNumber) => {
//     if (phoneNumber) {
//       alert(`Dialing ${phoneNumber}`);
//       // Uncomment to enable actual dialing
//       // window.location.href = `tel:${phoneNumber}`;
//     }
//   };

//   const handleBackToTable = () => {
//     setActiveContainer('TableComponent'); // Set active container to TableComponent
//   };
  
//   const handleBackToAnotherPage = () => {
//     setShowApplyRecordsContent(true); // Show the "Apply Records" content
//     setActiveContainer('ApplyRecords'); // Navigate to Apply Records
//   };

//   return (
//     <>
//           <AnimatePresence>
//         {activeContainer === 'TableComponent' && (
         
//             <TableComponent />
          
//         )}
//       {activeContainer === 'TraceComponent' && (
//         <motion.div 
//         key="view" // Unique key for Framer Motion
//         initial={{ x: '0%' }} // Start on screen
//         animate={{ x: '0%' }} // Stay on screen
//         exit={{ x: '100%' }} // Slide out to the left when going back
//         transition={{ duration: 0.5 }} // Duration of the transition
//       >
//         <div className={styles.container}>
//           {/* Header Section */}
//           <div className={styles.headerContainer}>
//             <h1 className={styles.header1}>Trace Records</h1>
//             <div className={styles.breadcrumbs}>
//               <span onClick={handleBackToAnotherPage}>Apply Record</span> &gt;
//               <span onClick={handleBackToTable} >Apply Record List</span> &gt;
//               <span>Trace Records</span>
//             </div>
//           </div>

//           {/* Apply Records Content */}
//           {showApplyRecordsContent && (
//                 <div>Content for Apply Records</div> // Display this content when applicable
//               )}

//           {/* Additional Info Section */}
//           <div className={styles.additionalInfoSection}>
//             <h2 className={styles.sectionTitle}>Additional Information</h2>
//             <table className={styles.infoTable}>
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Client</th>
//                   <th>Phone Number</th>
//                   <th>Apply Time</th>
//                   <th>Current Status</th>
//                   <th>Next Action Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{applicationInfo.product}</td>
//                   <td>{applicationInfo.client}</td>
//                   <td>{applicationInfo.phoneNumber}</td>
//                   <td>{applicationInfo.applyTime}</td>
//                   <td>{applicationInfo.currentStatus}</td>
//                   <td>{formatDate(applicationInfo.nextActionDate)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {/* Trace Log Table Section */}
//           <div className={styles.traceLogSection}>
//             <h2 className={styles.sectionTitle}>Trace Log</h2>
//             <table className={styles.traceLogTable}>
//               <thead>
//                 <tr>
//                   <th>Index</th>
//                   <th>Tracer</th>
//                   <th>Called Number</th>
//                   <th>Content</th>
//                   <th>Trace Time</th>
//                   <th>Abandoning Reason</th>
//                   <th>Call Disposition</th>
//                   <th>Sub Call Disposition</th>
//                   <th>Next Action Date</th>
//                   <th>Disbursement Amount</th>
                 
//                 </tr>
//               </thead>
//               <tbody>
//                 {actionCommunication.map((log, idx) => (
//                   <tr key={idx}>
//                     <td>{idx + 1}</td>
//                     <td>{log.tracer}</td>
//                     <td>{log.calledNumber}</td>
//                     <td>{log.content}</td>
//                     <td>{log.traceTime}</td>
//                     <td>{log.abandoningReason || 'N/A'}</td>
//                     <td>{log.callDisposition}</td>
//                     <td>{log.subCallDisposition}</td>
//                     <td>{formatDate(log.nextActionDate)}</td>
//                     <td>{log.disbursementAmount}</td>
                   
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Action Communication Form Section */}
//           <div className={styles.actionCommunicationSection}>
//             <h2 className={styles.sectionTitle}>Action Communication</h2>
//             <form onSubmit={handleSubmit} className={styles.form}>
//               <table className={styles.formTable}>
//                 <tbody>
//                   <tr>
//                     <td><label>Content:</label></td>
//                     <td>
//                       <input
//                         type="text"
//                         name="content"
//                         value={formData.content}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <td><label>Next Action Date:</label></td>
//                     <td>
//                       <input
//                         type="datetime-local"
//                         name="nextActionDate"
//                         value={formData.nextActionDate.slice(0, 16)}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <td><span>Set Status To:</span></td>
//                     <td>
//                       <div className={styles.radioGroup}>
//                         {['App Downloaded', 'Loan Applied', 'Approved', 'Rejected', 'Disbursed', 'Abandoned', 'Call Back'].map(status => (
//                           <label key={status} className={styles.radioLabel}>
//                             <input
//                               type="radio"
//                               name="status"
//                               value={status}
//                               checked={formData.status === status}
//                               onChange={handleInputChange}
//                             />
//                             {status}
//                           </label>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                   {formData.status === 'Abandoned' && (
//                     <tr>
//                       <td><label>Abandoning Reason:</label></td>
//                       <td>
//                         <select
//                           name="abandoningReason"
//                           value={formData.abandoningReason}
//                           onChange={handleInputChange}
//                           className={styles.selectInput}
//                         >
//                           <option value="">Select reason</option>
//                           <option value="Reason 1">Reason 1</option>
//                           <option value="Reason 2">Reason 2</option>
//                           <option value="Reason 3">Reason 3</option>
//                         </select>
//                       </td>
//                     </tr>
//                   )}
//                   <tr>
//                     <td><span>Call Disposition:</span></td>
//                     <td>
//                       <div className={styles.radioGroup}>
//                         {['Connected', 'Not Connected', 'Action', 'Abandoned'].map(disposition => (
//                           <label key={disposition} className={styles.radioLabel}>
//                             <input
//                               type="radio"
//                               name="callDisposition"
//                               value={disposition}
//                               checked={formData.callDisposition === disposition}
//                               onChange={handleInputChange}
//                             />
//                             {disposition}
//                           </label>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td><label>Sub Call Disposition:</label></td>
//                     <td>
//                       <select
//                         name="subCallDisposition"
//                         value={formData.subCallDisposition}
//                         onChange={handleInputChange}
//                         className={styles.selectInput}
//                       >
//                         <option value="">Select Sub Call Disposition</option>
//                         <option value="Follow-up">Follow-up</option>
//                         <option value="Not Interested">Not Interested</option>
//                         <option value="In Progress">In Progress</option>
//                       </select>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td><label>Disbursement Amount:</label></td>
//                     <td>
//                       <input
//                         type="number"
//                         name="disbursementAmount"
//                         value={formData.disbursementAmount}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <td colSpan="2">
//                       <button type="submit" className={styles.submitButton}>Submit</button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </form>
//           </div>

//           {/* Sticky Call Icon */}
//           <div className={styles.stickyCallButtonContainer}>
//             <button 
//               onClick={() => handleCall(applicationInfo.phoneNumber)} 
//               className={styles.stickyCallButton}
//             >
//               <FontAwesomeIcon icon={faPhone} className={styles.actionIcon} />
//             </button>
//           </div>

//           {/* Sticky Back Button */}
//           <div className={styles.stickyBackButtonContainer}>
//             <button 
//               onClick={handleBackToTable} 
//               className={styles.stickyBackButton}
//             >
//               &#8592;
//             </button>
//           </div>
//         </div>
//         </motion.div>
//       )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default TraceComponent;

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import styles from './TraceComponent.module.css';
import TableComponent from './TableComponent';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import axios from "axios";

const formatDate = (dateStr) => {
  if (!dateStr || isNaN(new Date(dateStr).getTime())) {
    return '';
  }

  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} T ${hours}:${minutes}:${seconds}`;
};

const TraceComponent = ({ rowData, globalResponse, rowIndex }) => {
  const router = useRouter();
  const [activeContainer, setActiveContainer] = useState('TraceComponent'); // State to manage active container
  const [formData, setFormData] = useState({
    tracer: '',
    calledNumber: '',
    content: '',
    traceTime: '',
    abandoningReason: '',
    callDisposition: '',
    subCallDisposition: '',
    nextActionDate: '',
    disbursementAmount: '',
    status: '',
    sendSmsTo: '', // New field for Send SMS to
  });

  // useEffect(()=>{
  //   const applyDate = new Date(rowData.applyTime);
  // const fomattedApplyDate = applyDate.toISOString().replace('T',' ').subString(0,19);
  // },[])

  // useEffect(()=>{
  //   console.log("Inside the updateLeadRecords :: ",globalResponse);
  // },[])

  const [actionCommunication, setActionCommunication] = useState([]);

  const [applicationInfo, setApplicationInfo] = useState({
    // product: 'mPokket',
    product: rowData.product,
    // client: 'ROSHAN RATHOD',
    client: rowData.customer,
    // phoneNumber: '705720.nextActionDate
    phoneNumber: rowData.phone,
    // applyTime: '2024-09-10 15:04:17',
    // applyTime: rowData.applyTime,   
    applyTime: new Date(rowData.applyTime).toISOString().replace('T', ' ').substring(0, 19),
    // currentStatus: 'Data Submitted',
    currentStatus: rowData.subStatus,
    // nextActionDate: '',
    nextActionDate: rowData.nextActionDate,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // App Downloaded', 'Loan Applied', 'Approved', 'Rejected', 'Disbursed', 'Abandoned', 'Call Back
    // if(value==="App Downloaded"){

    // }
    const updatedValue = name === 'status' || name === 'callDisposition' || name === 'abandoningReason' || name === 'subCallDisposition' ? Number(value) : value;
    setFormData(prev => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedTraceTime = formatDate(now.toISOString());

    const newLogEntry = {
      ...formData,
      traceTime: formattedTraceTime,
    };



    updateLeadRecords(e, formattedTraceTime);

    setActionCommunication(prev => [newLogEntry, ...prev]);
    setApplicationInfo(prev => ({
      ...prev,
      currentStatus: formData.status || prev.currentStatus,
      nextActionDate: formData.nextActionDate || prev.nextActionDate,
    }));

    setFormData({
      tracer: '',
      calledNumber: '',
      content: '',
      traceTime: '',
      abandoningReason: '',
      callDisposition: '',
      subCallDisposition: '',
      nextActionDate: '',
      disbursementAmount: '',
      status: '',
      sendSmsTo: '', // New field for Send SMS to
    });
  };
  

  const updateLeadRecords = async (e, formattedTraceTime) => {

    e.preventDefault();

    try {
      const index = rowIndex - 1;
      console.log("Inside the updateLeadRecords :: ", globalResponse.data[index], " and the rowIndex is :: ", rowIndex);

      console.log("Trace time from the formData is :: ", formData.traceTime);

      const formData1 = new FormData();
      formData1.append('applyId', globalResponse.data[rowIndex - 1].apply.id);
      formData1.append('tracer', formData.tracer);
      formData1.append('calledNumber', formData.calledNumber);
      formData1.append('content', formData.content);
      formData1.append('traceTime', formattedTraceTime);
      formData1.append('abandoningReason', formData.abandoningReason);
      formData1.append('callDisposition', formData.callDisposition);
      formData1.append('subCallDisposition', formData.subCallDisposition);
      formData1.append('nextActionDate', formData.nextActionDate);
      formData1.append('disbursementAmount', formData.disbursementAmount);
      formData1.append('status', formData.status);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}updateLead`, formData1);

      console.log(response);

      if (response.status === 200) {

        console.log("Inside when response.status is :: 200");

        console.log("response.data is :: ", response.data);

        console.log("And Response is :: ", response);// Set filtered rows to formatted data on load


      } else {
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // console.log(error.response.data);
    }
  };

  const handleCall = (phoneNumber) => {
    if (phoneNumber) {
      alert(`Dialing ${phoneNumber}`);
      // Uncomment to enable actual dialing
      // window.location.href = `tel:${phoneNumber}`;
    }
  };

  const handleBack = () => {
    setActiveContainer('TableComponent'); // Set active container to TableComponent
    // Any additional logic for back navigation can go here
  };

  const statusMap = {
    'App Downloaded': 0,
    'Loan Applied': 1,
    'Approved': 2,
    'Rejected': 3,
    'Disbursed': 4,
    'Abandoned': 5,
    'Call Back': 6
  };

  const callDispositionMap = {
    'Connected': 0,
    'Not Connected': 1,
    'Action': 2,
    'Abandoned': 3
  }

  const abandoningReasonMap = {
    'Cx not interested': 0,
    'Cx does not receive salary in account': 1,
    'Cx is not salaried': 2,
    'Cx does not meet criteria of lenders': 3,
  }

  const subCallDispositionMap = {
    'Interested': 0,
    'Not Interested': 1,
    'Future Prospect': 2,
    'Ringing': 3,
    'Disconnected': 4,
    'Waiting': 5,
    'Incoming Call Not Allowed': 6,
    'Switch off': 7,
    'Link shared of other lender': 8,
    'Will upload Doc': 9,
    'Complete Doc': 10,
    'Mandate Pending': 11,
    'Disbursement Pending': 12,
    'Salary Cash': 13,
    'Existing Customer': 14,
    'Criteria Not Meet': 15,
  };

  return (
    <>
      <AnimatePresence>
        {activeContainer === 'TableComponent' && (

          <TableComponent />

        )}
        {activeContainer === 'TraceComponent' && (
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
                <h1 className={styles.header1}>Trace Records</h1>
                <div className={styles.breadcrumbs}>
                  <span >Apply Record</span> &gt;
                  <span onClick={handleBack} >Apply Record List</span> &gt;
                  <span>Trace Records</span>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className={styles.additionalInfoSection}>
                <h2 className={styles.sectionTitle}>Additional Information</h2>
                <table className={styles.infoTable}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Client</th>
                      <th>Phone Number</th>
                      <th>Apply Time</th>
                      <th>Current Status</th>
                      <th>Next Action Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{applicationInfo.product}</td>
                      <td>{applicationInfo.client}</td>
                      <td>{applicationInfo.phoneNumber}</td>
                      <td>{applicationInfo.applyTime}</td>
                      <td>{applicationInfo.currentStatus}</td>
                      <td>{formatDate(applicationInfo.nextActionDate)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Trace Log Table Section */}
              <div className={styles.traceLogSection}>
                <h2 className={styles.sectionTitle}>Trace Log</h2>
                <table className={styles.traceLogTable}>
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Tracer</th>
                      <th>Called Number</th>
                      <th>Content</th>
                      <th>Trace Time</th>
                      <th>Abandoning Reason</th>
                      <th>Call Disposition</th>
                      <th>Sub Call Disposition</th>
                      <th>Next Action Date</th>
                      <th>Disbursement Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actionCommunication.map((log, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{log.tracer}</td>
                        <td>{log.calledNumber}</td>
                        <td>{log.content}</td>
                        <td>{log.traceTime}</td>
                        <td>{log.abandoningReason || 'N/A'}</td>
                        <td>{log.callDisposition}</td>
                        <td>{log.subCallDisposition}</td>
                        <td>{formatDate(log.nextActionDate)}</td>
                        <td>{log.disbursementAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Communication Form Section */}
              <div className={styles.actionCommunicationSection}>
                <h2 className={styles.sectionTitle}>Action Communication</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <table className={styles.formTable}>
                    <tbody>
                      <tr>
                        <td><label>Content:</label></td>
                        <td>
                          <input
                            type="text"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><label>Next Action Date:</label></td>
                        <td>
                          <input
                            type="datetime-local"
                            name="nextActionDate"
                            value={formData.nextActionDate.slice(0, 16)}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><span>Set Status To:</span></td>
                        <td>
                          {/* <div className={styles.radioGroup}>
                        {['App Downloaded', 'Loan Applied', 'Approved', 'Rejected', 'Disbursed', 'Abandoned', 'Call Back'].map(status => (
                          <label key={status} className={styles.radioLabel}>
                            <input
                              type="radio"
                              name="status"
                              value={status}
                              checked={formData.status === status}
                              onChange={handleInputChange}
                            />
                            {status}
                          </label>
                        ))}
                      </div> */}
                          <div className={styles.radioGroup}>
                            {Object.entries(statusMap).map(([status, value]) => (
                              <label key={status} className={styles.radioLabel}>
                                <input
                                  type="radio"
                                  name="status"
                                  value={value} // Use the numeric value here
                                  checked={formData.status === value} // Check against numeric value
                                  onChange={handleInputChange}
                                />
                                {status}
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                      {/* {formData.status === 6 && (
                    <tr>
                      <td><label>Abandoning Reason:</label></td>
                      <td>
                        <select
                          name="abandoningReason"
                          value={formData.abandoningReason}
                          onChange={handleInputChange}
                          className={styles.selectInput}
                        >
                          <option value="">Select reason</option>
                          <option value="Reason 1">Cx not interested</option>
                          <option value="Reason 2">Cx does not receive salary in account</option>
                          <option value="Reason 3">Cx is not salaried</option>
                          <option value="Reason 3">Cx does not meet criteria of lenders</option>
                        </select>
                      </td>
                    </tr>
                  )} */}

                      {formData.status === 5 && (
                        <tr>
                          <td><label>Abandoning Reason:</label></td>
                          <td>
                            <select
                              name="abandoningReason"
                              value={formData.abandoningReason}
                              onChange={handleInputChange}
                              className={styles.selectInput}
                            >
                              <option value="">Select reason</option>
                              {Object.entries(abandoningReasonMap).map(([reason, id]) => (
                                <option key={id} value={id}>
                                  {reason}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td><span>Call Disposition:</span></td>
                        <td>
                          <div className={styles.radioGroup}>

                            {Object.entries(callDispositionMap).map(([callDisposition, value]) => (
                              <label key={callDisposition} className={styles.radioLabel}>
                                <input
                                  type="radio"
                                  name="callDisposition"
                                  value={value} // Use the numeric value here
                                  checked={formData.callDisposition === value} // Check against numeric value
                                  onChange={handleInputChange}
                                />
                                {callDisposition}
                              </label>
                            ))}

                            {/* {['Connected', 'Not Connected', 'Action', 'Abandoned'].map(disposition => (
                          <label key={disposition} className={styles.radioLabel}>
                            <input
                              type="radio"
                              name="callDisposition"
                              value={disposition}
                              checked={formData.callDisposition === disposition}
                              onChange={handleInputChange}
                            />
                            {disposition}
                          </label>
                        ))} */}
                          </div>
                        </td>
                      </tr>
                      {/* <tr>
                    <td><label>Sub Call Disposition:</label></td>
                    <td>
                      <select
                        name="subCallDisposition"
                        value={formData.subCallDisposition}
                        onChange={handleInputChange}
                        className={styles.selectInput}
                      >
                        <option value="">Select Sub Call Disposition</option>
                        <option value="Interested">Interested</option>
                        <option value="Not Interested">Not Interested</option>
                        <option value="Future Prospect">Future Prospect</option>
                        <option value="Ringing">Ringing</option>
                        <option value="Disconnected">Disconnected</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Incoming Call Not Alowed">Incoming Call Not Alowed</option>
                        <option value="Switch off">Switch off</option>
                        <option value="Link shared of other lender">Link shared of other lender</option>
                        <option value="Will upload Doc">Will upload Doc</option>
                        <option value="Complete Doc">Complete Doc</option>
                        <option value="Mandate Pending">Mandate Pending</option>

                        <option value="Disbusment Pending">Disbusment Pending</option>
                        <option value="Salary Cash">Salary Cash</option>
                        <option value="Existing Customer">Existing Customer</option>
                        <option value="Criteria Not Meet">Criteria Not Meet</option>
                        

                      </select>
                    </td>
                  </tr> */}

                      <tr>
                        <td><label>Sub Call Disposition:</label></td>
                        <td>
                          <select
                            name="subCallDisposition"
                            value={formData.subCallDisposition}
                            onChange={handleInputChange}
                            className={styles.selectInput}
                          >
                            <option value="">Select Sub Call Disposition</option>
                            {Object.entries(subCallDispositionMap).map(([disposition, value]) => (
                              <option key={disposition} value={value}>
                                {disposition}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>



                      <tr>
                        <td><label>Disbursement Amount:</label></td>
                        <td>
                          <input
                            type="number"
                            name="disbursementAmount"
                            value={formData.disbursementAmount}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><span>Send SMS to:</span></td>
                        <td>
                          <div className={styles.radioGroup}>
                            {['Cashe', 'Upwards', 'Money View', 'Nira', 'Early Salary', 'Fullerton'].map(option => (
                              <label key={option} className={styles.radioLabel}>
                                <input
                                  type="radio"
                                  name="sendSmsTo"
                                  value={option}
                                  checked={formData.sendSmsTo === option}
                                  onChange={handleInputChange}
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>

                        <td colSpan="2">
                          <button type="submit" className={styles.submitButton}>Submit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>

              {/* Sticky Call Icon */}
              <div className={styles.stickyCallButtonContainer}>
                <button
                  onClick={() => handleCall(applicationInfo.phoneNumber)}
                  className={styles.stickyCallButton}
                >
                  <FontAwesomeIcon icon={faPhone} className={styles.actionIcon} />
                </button>
              </div>

              {/* Sticky Back Button */}
              <div className={styles.stickyBackButtonContainer}>
                <button
                  onClick={handleBack}
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

export default TraceComponent;

