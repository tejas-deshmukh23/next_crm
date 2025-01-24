"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import styles from './TraceComponent.module.css';
import TableComponent from './TableComponent';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import axios from "axios";
import ApplyOnlineCalledUsers from './ApplyOnlineCalledUsers';
import { getToken, setToken } from '@/utils/auth';
import {decodeToken } from '@/utils/auth';


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

const TraceComponent = ({ rowData, globalResponse, rowIndex, loginId, setCalledResponse, calledResponse, componentName }) => {

  const [userPayload, setUserPayload] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = getToken();
    if (!token) {
      // router.push('/login');
      setActiveContainer("LoginPage");
    } else {
      const decodedToken = decodeToken(token);
      if (!decodedToken || new Date(decodedToken.exp * 1000) < new Date()) {
        setActiveContainer("LoginPage");
      }else{
        if (decodedToken && decodedToken.payload) {
          const payloadObj = JSON.parse(decodedToken.payload);
          setUserPayload(payloadObj);
          console.log("The decoded token payload is :: ", payloadObj);

          setUser({
            username: payloadObj.username,
            role: payloadObj.role.title,
            loginId: payloadObj.loginId,
          });

          // if (payloadObj.username === 'admin' && payloadObj.role.title === 'Techsuper') {
          //   setActiveContainer("TLDashboard");
          // } else {
          //   setActiveContainer("MainPage");
          // }
        }
      }
    }
  }, []);

  const router = useRouter();
  const [activeContainer, setActiveContainer] = useState('TraceComponent'); // State to manage active container
  const [formData, setFormData] = useState({
    tracer: user.username,
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
    product: rowData?.product || 'N/A',
    // client: 'ROSHAN RATHOD',
    client: rowData?.customer || 'N/A',
    // phoneNumber: '705720.nextActionDate
    phoneNumber: rowData?.phone || 'N/A',
    // applyTime: '2024-09-10 15:04:17',
    // applyTime: rowData.applyTime,   
    applyTime: rowData?.applyTime ? new Date(rowData.applyTime).toISOString().replace('T', ' ').substring(0, 19) : 'N/A',
    // currentStatus: 'Data Submitted',
    currentStatus: rowData?.subStatus || 'N/A',
    // nextActionDate: '',
    nextActionDate: rowData?.nextActionDate || 'N/A' ,
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

      const updateLeadResponse = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}updateLead`, formData1);//This function updates the trace record
      console.log(updateLeadResponse);

      //Temporarily we will call here the method to save the calledLeads
      // console.log("The global Response before sending to the saveCalledLead api is :: ",globalResponse);
      // const formData2 = new FormData();
      // formData2.append("searchResponse",)

      console.log("Payload:", globalResponse.data[rowIndex - 1]);
console.log("Headers:", { 'User-Info': JSON.stringify(userPayload) });

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}saveCalledLead`,globalResponse.data[rowIndex-1],
      {
        headers: {
          'User-Info': JSON.stringify(userPayload.loginId)  // Send user info in headers
        }
        // headers: {
        //     'User-Info': userPayload  // Send user info in headers
        //   }
      });

      // console.log(response);

      updateAllocatedLead(e);

      // setCalledResponse(globalResponse.data[rowIndex-1]);
      const newResponse = globalResponse.data[rowIndex-1];
        
        // Update state by adding the new response to the array
        setCalledResponse(prevResponses => {
          // If prevResponses is empty, start with an array containing just the new response
          if (!Array.isArray(prevResponses) || prevResponses.length === 0) {
            return [newResponse];
          }
          // Otherwise, add the new response to the existing array
          return [...prevResponses, newResponse];
        });

      // if (response.status === 200) {

        

      //   console.log("Inside when response.status is :: 200");

      //   console.log("response.data is :: ", response.data);

      //   console.log("And Response is :: ", response);// Set filtered rows to formatted data on load


      // } else {
      // }
    } catch (error) {
      console.error('Error submitting form:', error);
      // console.log(error.response.data);
    }
  };

  const handleCall = (phoneNumber) => {
    if (phoneNumber) {
      alert(`Dialing ${phoneNumber}`);
    }
  };

  const handleBack = () => {
    // alert(componentName);
    if(componentName !== "ApplyOnlineCalledUsers")
    {
      setActiveContainer('TableComponent'); // Set active container to TableComponent
    }else{
      setActiveContainer('ApplyOnlineCalledUsers');
    }

    // setActiveContainer("ApplyOnlineCalledUsers");
    
    // Any additional logic for back navigation can go here
  };

  // const statusMap = {
  //   'App Downloaded': 0,
  //   'Loan Applied': 1,
  //   'Approved': 2,
  //   'Rejected': 3,
  //   'Disbursed': 4,
  //   'Abandoned': 5,
  //   'Call Back': 6
  // };

  const statusMap = {
    'App Downloaded': 1,
    'Loan Applied': 2,
    'Approved': 3,
    'Rejected': 4,
    'Disbursed': 5,
    'Abandoned': 7,
    'Call Back': 9
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

  // const updateAllocatedLead = async (e) => {

  //   console.log("Inside the updateAllocatedLead");

  //   e.preventDefault();

  //   try {
  //     const index = rowIndex - 1;
  //     console.log("Inside the updateAllocatedLead :: ");

  //     const formData1 = new FormData();

  //     formData1.append('loginId', user.loginId);
  //     formData1.append('searchResponse',  globalResponse.data[rowIndex - 1]);

  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}removeAllocatedLead`,formData1);

  //     console.log("The response form updateAllocatedLeads is :: ",response);

  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     // console.log(error.response.data);
  //   }
  // };

  const updateAllocatedLead = async (e) => {
    console.log("Inside the updateAllocatedLead");
    e.preventDefault();

    try {
        const index = rowIndex - 1;
        const searchResponseData = globalResponse.data[rowIndex - 1];
        
        // Log the data being sent for debugging
        console.log("Data being sent:", searchResponseData);
        console.log("Login ID being sent:", user.loginId);

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}removeAllocatedLead`,
            searchResponseData,  // Send the search response data directly as the body
            {
                headers: {
                    'Content-Type': 'application/json',
                    'loginId': user.loginId  // Remove JSON.stringify - send raw value
                }
            }
        );

        console.log("The response from updateAllocatedLeads is :: ", response);

    } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        }
    }
};

  return (
    <>
      <AnimatePresence>
        {activeContainer === 'TableComponent' && (

          <TableComponent loginId={loginId} />

        )}
        {
          activeContainer === "ApplyOnlineCalledUsers" && 
          // <ApplyOnlineCalledUsers setCalledResponse={setCalledResponse} calledResponse={calledResponse} key={activeSubOption} subOption={activeSubOption} loginId={user.loginId}/>
          <ApplyOnlineCalledUsers setCalledResponse={setCalledResponse} calledResponse={calledResponse} loginId={loginId}/>
          
        }
        {activeContainer === 'TraceComponent' && (
          <motion.div
            key="view" // Unique key for Framer Motion
            initial={{ x: '0%' }} // Start on screen
            animate={{ x: '0%' }} // Stay on screenxr
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

