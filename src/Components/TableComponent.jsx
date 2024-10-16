// "use client";

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import styles from './TableComopnent.module.css'; // Ensure the path is correct
// import { FaEye, FaPhone } from 'react-icons/fa'; // Import remaining icons from react-icons
// import traceImg from "../Components/crmimages/traceicon.png";
// import TraceComponent from './TraceComponent';
// import ViewComponent from './ViewComponent';
// import { motion } from 'framer-motion'; // Import motion from framer-motion
// import axios from "axios";

// const TableComponent = () => {
//   const [searchCriteria, setSearchCriteria] = useState({
//     customer: '',
//     phone: '',
//     product: '',
//     status: '',
//     applyStartTime: '',
//     applyEndTime: '',
//     nextActionStartDate: '',
//     nextActionEndDate: '',
//     priority: '',
//     dsa: '',
//     leadType: ''
//   });

//   const [activeContainer, setActiveContainer] = useState('tableComponent');
//   const [rows, setRows] = useState(generateDummyData());
//   const [filteredRows, setFilteredRows] = useState(rows);
//   const [error, setError] = useState('');

//   // --------------------------------------------------------------------------------------------------------------------------------------

//   const [globalResponse, setGlobalResponse] = useState({});

//   useEffect(()=>{
//     getLeadAllRecords();
//   },[])

//   const getLeadAllRecords = async () => {
//     // e.preventDefault();
    
//     try {
  
//         // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}chfronetendotpgenerator`, formData1, {
//         //     headers: {
//         //         'Content-Type': 'application/json',`
//         //     },
//         // });


  
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}findAll`);
//         setGlobalResponse(response);
//         console.log(response);
  
//         if (response.status === 200) {

//           console.log("Inside when response.status is :: 200");

//           console.log("response.data is :: ",response.data);                                            

//           const formattedData = response.data.map((item, index) => ({          
//           //   index: index + 1,
//           //   customer: item.partnerId, // Adjust as needed based on the structure of your data
//           //   phone: item.applyPhone,
//           //   product: item.agent, // You may need to adjust this based on your data 
//           //   status: item.statusStr,
//           //   subStatus: item.message,
//           //   disposition: item.disposition,
//           //   applyTime: item.applyTime,
//           //   dsa: item.agent,
//           //   leadType: item.category || 'N/A', // Default value if category is null
//           //   nextActionDate: item.nextActionDate || null, // Include if you need it for filtering
//           //   priority: item.priority || 'N/A' // Default if priority is null

//           index: index + 1,
//           customer: item.userInfo.firstname || 'N/A',
//           phone: item.apply.applyPhone || 'N/A',
//           product: item.product.productName || 'N/A',
//           status: item.apply.statusStr || 'N/A',
//           subStatus: item.apply.message || 'N/A',
//           disposition: item.apply.message1 || 'N/A',
//           applyTime: item.apply.applyTime || 'N/A',
//           dsa: item.apply.agent || 'N/A',
//           // leadType: item.apply.tier || 'N/A',
//           leadType: item.apply.tier === 0 ? "platinum" : item.apply.tier === 1 ? "Gold" : item.apply.tier === 2 ? "Silver" : item.apply.tier === 3 ? "Bronze" : "other" ,
//           nextActionDate: item.apply.nextActionDate || null,
//           priority: item.apply.priority || 'N/A'

//           }));

          
    
//           setRows(formattedData);
//           setFilteredRows(formattedData); // Set filtered rows to formatted data on load


//         } else {
//         }
//     } catch (error) {
//         console.error('Error submitting form:', error);
//         // console.log(error.response.data);
//     }
//   };

//   const getLeadSearchedRecords = async (agent, status, applyStartTime, phone, product, customerName) => {
//     // e.preventDefault();

//     console.log("applyStartTime inside the getLeadSearchedRecords :: ",applyStartTime);
//     console.log("Phone is :: ", phone);
    
//     try {

//       const formData1 = new FormData();
//       // formData1.append('agent', agent);
//       formData1.append('status', status);
//       // formData1.append('applyTime', applyStartTime);
//       formData1.append('phone',phone);
//       formData1.append('product', product);
//       formData1.append('customerName', customerName);

//         const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}search`, formData1);

//         setGlobalResponse(response);

//         console.log(response);
  
//         if (response.status === 200) {

//           console.log("Inside when response.status is :: 200");

//           console.log("response.data is :: ",response.data);

//           console.log("And Response is :: ",response);

         

//           const formattedData = response.data.map((item, index) => ({
            
//             // index: index + 1,
//             // customer: item.firstName, // Adjust as needed based on the structure of your data
//             // phone: item.applyPhone,
//             // product: item.agent, // You may need to adjust this based on your data
//             // status: item.statusStr,
//             // subStatus: item.message,
//             // disposition: item.disposition,
//             // applyTime: item.applyTime,
//             // dsa: item.agent,
//             // leadType: item.category || 'N/A', // Default value if category is null
//             // nextActionDate: item.nextActionDate || null, // Include if you need it for filtering
//             // priority: item.priority || 'N/A' // Default if priority is null

//             index: index + 1,
//                 customer: item.userInfo.firstname || 'N/A',
//                 phone: item.apply.applyPhone || 'N/A',
//                 product: item.product.productName || 'N/A',
//                 status: item.apply.statusStr || 'N/A',
//                 subStatus: item.apply.message || 'N/A',
//                 disposition: item.apply.message1 || 'N/A',
//                 applyTime: item.apply.applyTime || 'N/A',
//                 dsa: item.apply.agent || 'N/A',
//                 // leadType: item.apply.tier || 'N/A',
//                 leadType: item.apply.tier === 0 ? "platinum" : item.apply.tier === 1 ? "Gold" : item.apply.tier === 2 ? "Silver" : item.apply.tier === 3 ? "Bronze" : "other" ,
//                 nextActionDate: item.apply.nextActionDate || null,
//                 priority: item.apply.priority || 'N/A'
//           }));
    
//           setRows(formattedData);
//           setFilteredRows(formattedData); // Set filtered rows to formatted data on load


//         } else {
//         }
//     } catch (error) {
//         console.error('Error submitting form:', error);
//         // console.log(error.response.data);
//     }
//   };

//   // ---------------------------------------------------------------------------------------------------------------------------------------

//   function generateDummyData() {
//     return [...Array(10)].map((_, index) => ({
//       index: index + 1,
//       customer: `Customer ${index + 1}`,
//       phone: `Phone ${index + 1}`,
//       product: `Product ${index + 1}`,
//       status: `Status ${index + 1}`,
//       message: `Message ${index + 1}`,
//       applyTime: `2024-09-0${(index % 5) + 1}T12:00`, // Sample date-time
//       dsa: `DSA ${index + 1}`,
//       leadType: `Lead Type ${index + 1}`
//     }));
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSearchCriteria(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSearch = () => {

//     getLeadSearchedRecords(searchCriteria.agent, searchCriteria.status, searchCriteria.applyStartTime, searchCriteria.phone, searchCriteria.product, searchCriteria.customer);


//   };

//   const handleTrace = () => {
//     setActiveContainer('TraceComponent');
//   };

//   const handleView = () => {
//     setActiveContainer('ViewComponent');
//   };

//   return (
//     <>
//       {activeContainer === 'TraceComponent' && (
//         <motion.div 
//           initial={{ x: '100%' }} 
//           animate={{ x: 0 }} 
//           exit={{ x: '100%' }} 
//           transition={{ duration: 0.5 }} // Adjust the duration for speed
//         >
//           <TraceComponent />
//         </motion.div>
//       )}

//       {activeContainer === 'ViewComponent' && (
//         <motion.div 
//           initial={{ x: '100%' }} 
//           animate={{ x: 0 }} 
//           exit={{ x: '100%' }} 
//           transition={{ duration: 0.5 }} // Adjust the duration for speed
//         >
//           <ViewComponent />
//         </motion.div>
//       )}

//       {activeContainer === 'tableComponent' && (
//         <motion.div
//           initial={{ x: 0 }} 
//           animate={{ x: 0 }} 
//           exit={{ x: '-100%' }} // Optional, if you want to animate the exit
//           transition={{ duration: 0.5 }} // Adjust the duration for speed
//         >
//           <div className={styles.container}>
//             {/* Breadcrumb Navigation */}
//             <div className={styles.headerContainer}>
//               <h1 className={styles.header1}>Apply Record</h1>
//               <div className={styles.breadcrumbs}>
//                 <span>Apply Record</span> &gt;
//                 <span>Apply Record List</span>
//               </div>
//             </div>

//             {/* Search and Filter Section */}
//             <div className={styles.searchContainer}>
//               <input
//                 type="text"
//                 name="customer"
//                 placeholder="Customer Name"
//                 value={searchCriteria.customer}
//                 onChange={handleChange}
//                 className={styles.searchInput}
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone No."
//                 value={searchCriteria.phone}
//                 onChange={handleChange}
//                 className={styles.searchInput}
//               />
//               <select
//                 name="product"
//                 value={searchCriteria.product}
//                 onChange={handleChange}
//                 className={styles.selectInput}
//               >
//                 <option value="">Product</option>
//                 <option value="Product 1">Product 1</option>
//                 <option value="Product 2">Product 2</option>
//                 <option value="Product 3">Product 3</option>
//               </select>
//               <select
//                 name="status"
//                 value={searchCriteria.status}
//                 onChange={handleChange}
//                 className={styles.selectInput}
//               >
//                 <option value="">Status</option>
//                 <option value="Status 1">Status 1</option>
//                 <option value="Status 2">Status 2</option>
//                 <option value="Status 3">Status 3</option>
//               </select>
//               <div className={styles.dateRangeContainer}>
//                 <label className={styles.dateRangeLabel}>Apply Time:</label>
//                 <input
//                   type="datetime-local"
//                   name="applyStartTime"
//                   value={searchCriteria.applyStartTime}
//                   onChange={handleChange}
//                   className={styles.datetimeInput}
//                 />
//                 <span className={styles.dateRangeSeparator}>to</span>
//                 <input
//                   type="datetime-local"
//                   name="applyEndTime"
//                   value={searchCriteria.applyEndTime}
//                   onChange={handleChange}
//                   className={styles.datetimeInput}
//                 />
//               </div>
//               <select
//                 name="priority"
//                 value={searchCriteria.priority}
//                 onChange={handleChange}
//                 className={styles.selectInput}
//               >
//                 <option value="">Priority</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
              
//               <select
//                 name="leadType"
//                 value={searchCriteria.leadType}
//                 onChange={handleChange}
//                 className={styles.selectInput}
//               >
//                 <option value="">Lead type</option>
//                 <option value="Lead Type 1">Lead Type 1</option>
//                 <option value="Lead Type 2">Lead Type 2</option>
//                 <option value="Lead Type 3">Lead Type 3</option>
//               </select>
             
//               <div className={styles.dateRangeContainer}>
//                 <label className={styles.dateRangeLabel}>Next action date:</label>
//                 <input
//                   type="datetime-local"
//                   name="nextActionStartDate"
//                   value={searchCriteria.nextActionStartDate}
//                   onChange={handleChange}
//                   className={styles.datetimeInput}
//                 />
//                 <span className={styles.dateRangeSeparator}>to</span>
//                 <input
//                   type="datetime-local"
//                   name="nextActionEndDate"
//                   value={searchCriteria.nextActionEndDate}
//                   onChange={handleChange}
//                   className={styles.datetimeInput}
//                 />
//               </div>
//               <button onClick={handleSearch} className={styles.searchButton}>Search</button>
//             </div>

//             {error && <p className={styles.error}>{error}</p>}

//             {/* Table Section */}
//             <div className={styles.tableContainer}>
//               <table className={styles.table}>
//                 <thead>
//                   <tr>
//                     {['Index', 'Customer Name', 'Phone No.', 'Product Name', 'Status', 'Message', 'Apply Time', 'DSA', 'Lead Type', 'Actions'].map((header, index) => (
//                       <th key={index}>{header}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.map((row, rowIndex) => (
//                     <tr key={rowIndex}>
//                       <td>{row.index}</td>
//                       <td>{row.customer}</td>
//                       <td>{row.phone}</td>
//                       <td>{row.product}</td>
//                       <td>{row.status}</td>
//                       <td>{row.message}</td>
//                       <td>{new Date(row.applyTime).toLocaleString()}</td>
//                       <td>{row.dsa}</td>
//                       <td>{row.leadType}</td>
//                       <td>
//                         <div className={styles.actions}>
//                           <Image
//                             src={traceImg}
//                             alt="Trace"
//                             width={20}
//                             height={20}
//                             className={styles.actionIcon}
//                             onClick={handleTrace}
//                           />
//                           <FaEye title="View" className={styles.actionIcon} onClick={handleView} />
//                           <a href={`tel:${row.phone}`}><FaPhone title="Call" className={styles.actionIcon} /></a>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </>
//   );
// };

// export default TableComponent;

"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './TableComopnent.module.css'; // Ensure the path is correct
import { FaEye, FaPhone } from 'react-icons/fa'; // Import remaining icons from react-icons
import traceImg from "../Components/crmimages/traceicon.png";
import TraceComponent from './TraceComponent';
import ViewComponent from './ViewComponent';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import axios from "axios";

const TableComponent = () => {

  const [globalResponse, setGlobalResponse] = useState({});


  const [searchCriteria, setSearchCriteria] = useState({
    customer: null,
    phone: null,
    product: null,
    status: '',
    applyStartTime: null,
    applyEndTime: null,
    nextActionStartDate: null,
    nextActionEndDate: null,
    priority: null,
    dsa: null,
    disposition: null,
    leadType: null
  });

  const [activeContainer, setActiveContainer] = useState('tableComponent');
  const [rows, setRows] = useState(generateDummyData());
  const [filteredRows, setFilteredRows] = useState(rows);
  const [error, setError] = useState('');

  function generateDummyData() {
    return [...Array(10)].map((_, index) => ({
      index: index + 1,
      customer: `Customer ${index + 1}`,
      phone: `Phone ${index + 1}`,
      product: `Product ${index + 1}`,
      status: `Status ${index + 1}`,
      subStatus:`Sub Status ${index + 1}`,
      disposition: `disposition ${index + 1}`,
      applyTime: `2024-09-0${(index % 5) + 1}T12:00`, // Sample date-time
      dsa: `DSA ${index + 1}`,
      leadType: `Lead Type ${index + 1}`
      


    }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {

    console.log("Before the getLeadSearchedRecords applyStartTime :: ",searchCriteria.applyStartTime);
    console.log("Before the getLeadSearchesRecords :: ",searchCriteria.phone);

    getLeadSearchedRecords(searchCriteria.agent, searchCriteria.status, searchCriteria.applyStartTime, searchCriteria.phone, searchCriteria.product, searchCriteria.customer);


    console.log("Inside the handleSearch searchCriteria :: ", !searchCriteria.customer);
    

    // const filtered = rows.filter(row => {
    //   const applyTime = new Date(row.applyTime);
    //   const nextActionDate = new Date(row.nextActionDate);
    //   const applyStartTime = new Date(searchCriteria.applyStartTime);
    //   const applyEndTime = new Date(searchCriteria.applyEndTime);
    //   const nextActionStartDate = new Date(searchCriteria.nextActionStartDate);
    //   const nextActionEndDate = new Date(searchCriteria.nextActionEndDate);

    //   return (
    //     (!searchCriteria.customer || (row.customer && row.customer.includes(searchCriteria.customer))) &&
    //     (!searchCriteria.phone || (row.phone && row.phone.includes(searchCriteria.phone))) &&            
    //     (!searchCriteria.product || (row.product && row.product.includes(searchCriteria.product))) &&
    //     (!searchCriteria.status || (row.status && row.status.includes(searchCriteria.status))) &&
    //     (isNaN(applyStartTime) || isNaN(applyEndTime) || (applyTime >= applyStartTime && applyTime <= applyEndTime)) &&
    //     (isNaN(nextActionStartDate) || isNaN(nextActionEndDate) || (nextActionDate >= nextActionStartDate && nextActionDate <= nextActionEndDate)) &&
    //     (!searchCriteria.priority || (row.priority && row.priority.includes(searchCriteria.priority))) &&
    //     (!searchCriteria.dsa || (row.dsa && row.dsa.includes(searchCriteria.dsa))) &&
    //     (!searchCriteria.leadType || (row.leadType && row.leadType.includes(searchCriteria.leadType)))&&
    //     (!searchCriteria.disposition || (row.disposition && row.disposition.includes(searchCriteria.disposition)))

    //   );
    // });

    // setFilteredRows(filtered);

    // if (filtered.length === 0) {
    //   setError('No records found');
    // } else {
    //   setError('');
    // }
  };

  const[rowIndex, setRowIndex] = useState(null);
  const[rowData, setRowData] = useState({});

  const handleTrace = (row, rowIndex) => {
    // setRowIndex(index);
    setRowData(row);
    setRowIndex(rowIndex);
    console.log("RowData is :: ",rowData);
    console.log("Row is :: ",row);
    setActiveContainer('TraceComponent');
  };

  useEffect(()=>{
    console.log("Inside UseEffect therowData is :: ",rowData);
    // setActiveContainer('TraceComponent');
  },[rowData])

  const handleView = () => {
    setActiveContainer('ViewComponent');
  };

  useEffect(()=>{
    getLeadAllRecords();
  },[])

  const getLeadAllRecords = async () => {
    // e.preventDefault();
    
    try {
  
        // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}chfronetendotpgenerator`, formData1, {
        //     headers: {
        //         'Content-Type': 'application/json',`
        //     },
        // });


  
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}findAll`);
        setGlobalResponse(response);
        console.log(response);
  
        if (response.status === 200) {

          console.log("Inside when response.status is :: 200");

          console.log("response.data is :: ",response.data);                                            

          const formattedData = response.data.map((item, index) => ({          
          //   index: index + 1,
          //   customer: item.partnerId, // Adjust as needed based on the structure of your data
          //   phone: item.applyPhone,
          //   product: item.agent, // You may need to adjust this based on your data 
          //   status: item.statusStr,
          //   subStatus: item.message,
          //   disposition: item.disposition,
          //   applyTime: item.applyTime,
          //   dsa: item.agent,
          //   leadType: item.category || 'N/A', // Default value if category is null
          //   nextActionDate: item.nextActionDate || null, // Include if you need it for filtering
          //   priority: item.priority || 'N/A' // Default if priority is null

          index: index + 1,
          customer: item.userInfo.firstname || 'N/A',
          phone: item.apply.applyPhone || 'N/A',
          product: item.product.productName || 'N/A',
          status: item.apply.statusStr || 'N/A',
          subStatus: item.apply.message || 'N/A',
          disposition: item.apply.message1 || 'N/A',
          applyTime: item.apply.applyTime || 'N/A',
          dsa: item.apply.agent || 'N/A',
          // leadType: item.apply.tier || 'N/A',
          leadType: item.apply.tier === 0 ? "platinum" : item.apply.tier === 1 ? "Gold" : item.apply.tier === 2 ? "Silver" : item.apply.tier === 3 ? "Bronze" : "other" ,
          nextActionDate: item.apply.nextActionDate || null,
          priority: item.apply.priority || 'N/A'

          }));

          
    
          setRows(formattedData);
          setFilteredRows(formattedData); // Set filtered rows to formatted data on load


        } else {
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        // console.log(error.response.data);
    }
  };

  const getLeadSearchedRecords = async (agent, status, applyStartTime, phone, product, customerName) => {
    // e.preventDefault();

    console.log("applyStartTime inside the getLeadSearchedRecords :: ",applyStartTime);
    console.log("Phone is :: ", phone);
    
    try {

      const formData1 = new FormData();
      // formData1.append('agent', agent);
      formData1.append('status', status);
      // formData1.append('applyTime', applyStartTime);
      formData1.append('phone',phone);
      formData1.append('product', product);
      formData1.append('customerName', customerName);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}search`, formData1);

        setGlobalResponse(response);

        console.log(response);
  
        if (response.status === 200) {

          console.log("Inside when response.status is :: 200");

          console.log("response.data is :: ",response.data);

          console.log("And Response is :: ",response);

         

          const formattedData = response.data.map((item, index) => ({
            
            // index: index + 1,
            // customer: item.firstName, // Adjust as needed based on the structure of your data
            // phone: item.applyPhone,
            // product: item.agent, // You may need to adjust this based on your data
            // status: item.statusStr,
            // subStatus: item.message,
            // disposition: item.disposition,
            // applyTime: item.applyTime,
            // dsa: item.agent,
            // leadType: item.category || 'N/A', // Default value if category is null
            // nextActionDate: item.nextActionDate || null, // Include if you need it for filtering
            // priority: item.priority || 'N/A' // Default if priority is null

            index: index + 1,
                customer: item.userInfo.firstname || 'N/A',
                phone: item.apply.applyPhone || 'N/A',
                product: item.product.productName || 'N/A',
                status: item.apply.statusStr || 'N/A',
                subStatus: item.apply.message || 'N/A',
                disposition: item.apply.message1 || 'N/A',
                applyTime: item.apply.applyTime || 'N/A',
                dsa: item.apply.agent || 'N/A',
                // leadType: item.apply.tier || 'N/A',
                leadType: item.apply.tier === 0 ? "platinum" : item.apply.tier === 1 ? "Gold" : item.apply.tier === 2 ? "Silver" : item.apply.tier === 3 ? "Bronze" : "other" ,
                nextActionDate: item.apply.nextActionDate || null,
                priority: item.apply.priority || 'N/A'
          }));
    
          setRows(formattedData);
          setFilteredRows(formattedData); // Set filtered rows to formatted data on load


        } else {
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        // console.log(error.response.data);
    }
  };

  useEffect(()=>{
    console.log("Updated the value in the globalResponse :: ",globalResponse);
  },globalResponse)

  return (
    <>
      {activeContainer === 'TraceComponent' && ( 
        <motion.div 
          initial={{ x: '100%' }} 
          animate={{ x: 0 }} 
          exit={{ x: '100%' }} 
          transition={{ duration: 0.5 }} // Adjust the duration for speed
        >
          <TraceComponent rowData = {rowData} globalResponse={globalResponse} rowIndex={rowIndex}/>
        </motion.div>
      )}

      {activeContainer === 'ViewComponent' && (
        <motion.div 
          initial={{ x: '100%' }} 
          animate={{ x: 0 }} 
          exit={{ x: '100%' }} 
          transition={{ duration: 0.5 }} // Adjust the duration for speed
        >
          <ViewComponent />
        </motion.div>
      )}

      {activeContainer === 'tableComponent' && (
        <motion.div
          initial={{ x: 0 }} 
          animate={{ x: 0 }} 
          exit={{ x: '-100%' }} // Optional, if you want to animate the exit
          transition={{ duration: 0.5 }} // Adjust the duration for speed
        >
          <div className={styles.container}>
            {/* Breadcrumb Navigation */}
            <div className={styles.headerContainer}>
              <h1 className={styles.header1}>Apply Record</h1>
              <div className={styles.breadcrumbs}>
                <span>Apply Record</span> &gt;
                <span>Apply Record List</span>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                name="customer"
                placeholder="Customer Name"
                value={searchCriteria.customer}
                onChange={handleChange}
                className={styles.searchInput}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone No."
                value={searchCriteria.phone}
                onChange={handleChange}
                className={styles.searchInput}
              />
              <select
                name="product"
                value={searchCriteria.product}
                onChange={handleChange}
                className={styles.selectInput}
              >
                <option value="">Product</option>
                <option value="PaySense">PaySense</option>
                <option value="MoneyTap">MoneyTap</option>
                <option value="CASHe">CASHe</option>
                <option value="EarlySalary">EarlySalary</option>
                <option value="NIRA">NIRA</option>
                <option value="LoanTap">LoanTap</option>
                <option value="MoneyView">MoneyView</option>
                <option value="SalaryDost">SalaryDost</option>
                <option value="Billioncash">Billioncash</option>
                <option value="Kredit One">Kredit One</option>
                <option value="SmartCoin">SmartCoin</option>
                <option value="Avail Finance">Avail Finance</option>
                <option value="Galaxy Card">Galaxy Card</option>
                <option value="Upwords">Upwords</option>
                <option value="InstaRupee">InstaRupee</option>
                <option value="True Balance">True Balance</option>
                <option value="Phocket">Phocket</option>
                <option value="ZestMoney">ZestMoney</option>
                <option value="InstaMoney">InstaMoney</option>
                <option value="FinHeal">FinHeal</option>
                <option value="NAVI">NAVI</option>
                <option value="PayMe">PayMe</option>
                <option value="Stash Fin">Stash Fin</option>

                <option value="Tala-Credit Builder">Tala-Credit Builder</option>
                <option value="mPokket">mPokket</option>
                <option value="FairMoney">FairMoney</option>
                <option value="RupeeRedee">RupeeRedee</option>
                <option value="Rapid Rupee">Rapid Rupee</option>
                <option value="slice-Visa Card">slice-Visa Card</option>
                <option value="Bajaj Finserv">Bajaj Finserv</option>
                <option value="Fulletron">Fulletron</option>
                <option value="Indifi">Indifi</option>
                <option value="Finnable">Finnable</option>
                <option value="HomeCredit">HomeCredit</option>
                <option value="Finzy">Finzy</option>
                <option value="FlexiLoans">FlexiLoans</option>
                <option value="Kinara">Kinara</option>
                <option value="TataCapital">TataCapital</option>
                <option value="KreditBee">KreditBee</option>
                <option value="Prefr">Prefr</option>
                <option value="Privo">Privo</option>
                <option value="InActive">InActive</option>
                <option value="Incred">Incred</option>
                <option value="IIFL-PL">IIFL-PL</option>
                <option value="IIFL-BL">IIFL-BL</option>
                <option value="FatakPay">FatakPay</option>
                <option value="MoneyWide">MoneyWide</option>

                <option value="MobiKwik-Zip Loan">MobiKwik-Zip Loan</option>
                <option value="IIFL-GOLD-LOAN">IIFL-GOLD-LOAN</option>
                <option value="IDFC">IDFC</option>
                <option value="Zype">Zype</option>
                <option value="Kissht">Kissht</option>
                <option value="Freed">Freed</option>
                <option value="Aditya Birla Capital">Aditya Birla Capital</option>
                <option value="LTFS">LTFS</option>
                <option value="Aditya Birla Capital-BL">Aditya Birla Capital-BL</option>
                <option value="Gosree Finance Limited">Gosree Finance Limited</option>
                <option value="LTPL">LTPL</option>
                <option value="Tata neu">Tata neu</option>
                <option value="Aspire-BL">Aspire-BL</option>
                <option value="Trust Paisa">Trust Paisa</option>
                <option value="branch">branch</option>
                <option value="HDFC-Credit Card">HDFC-Credit Card</option>
                <option value="Loan on Card">Loan on Card</option>
                
              </select>
              <select
                name="status"
                value={searchCriteria.status}
                onChange={handleChange}
                className={styles.selectInput}
              >
                <option value="">Status</option>
                <option value="Data Submitted">Data Submitted</option>
                <option value="App Downloaded">App Downloaded</option>
                <option value="Loan Applied">Loan Applied</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Disbursed">Disbursed</option>
                <option value="Form Filled">Form Filled</option>
                <option value="Abandoned">Abandoned</option>
                <option value="offline">offline</option>
                <option value="call back">call back</option>
                <option value="hold for itpl">hold for itpl</option>


              </select>     
              <select
                name="disposition"
                value={searchCriteria.disposition}
                onChange={handleChange}
                className={styles.selectInput}
              >
                <option value="">Disposition</option>
                <option value="Disposition 1">Disposition 1</option>
                <option value="Disposition 2">Disposition 2</option>
                <option value="Disposition 3">Disposition 3</option>
              </select>      
              <div className={styles.dateRangeContainer}>
                <label className={styles.dateRangeLabel}>Apply Time:</label>
                <input
                  type="datetime-local"
                  name="applyStartTime"
                  value={searchCriteria.applyStartTime}
                  onChange={handleChange}
                  className={styles.datetimeInput}
                />
                <span className={styles.dateRangeSeparator}>to</span>
                <input
                  type="datetime-local"
                  name="applyEndTime"
                  value={searchCriteria.applyEndTime}
                  onChange={handleChange}
                  className={styles.datetimeInput}
                />
              </div>
              <select
                name="priority"
                value={searchCriteria.priority}
                onChange={handleChange}
                className={styles.selectInput}
              >
                <option value="">Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
                <option value="P4">P4</option>
                <option value="P5">P5</option>
                <option value="P6">P6</option>

              </select>
              
              <select
                name="leadType"
                value={searchCriteria.leadType}
                onChange={handleChange}
                className={styles.selectInput}
              >
                <option value="">Lead type</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
                <option value="Others">Others</option>
              </select>
             
              <div className={styles.dateRangeContainer}>
                <label className={styles.dateRangeLabel}>Next action date:</label>
                <input
                  type="datetime-local"
                  name="nextActionStartDate"
                  value={searchCriteria.nextActionStartDate}
                  onChange={handleChange}
                  className={styles.datetimeInput}
                />
                <span className={styles.dateRangeSeparator}>to</span>
                <input
                  type="datetime-local"
                  name="nextActionEndDate"
                  value={searchCriteria.nextActionEndDate}
                  onChange={handleChange}
                  className={styles.datetimeInput}
                />
              </div>
              <button onClick={handleSearch} className={styles.searchButton}>Search</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {/* Table Section */}
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {['Index', 'Customer Name', 'Phone No.', 'Product Name', 'Status','Sub Status' , 'Disposition', 'Apply Time', 'DSA', 'Lead Type', 'Actions'].map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{row.index}</td>
                      <td>{row.customer}</td>
                      <td>{row.phone}</td>
                      <td>{row.product}</td>
                      <td>{row.status}</td>
                      <td>{row.subStatus}</td>
                      <td>{row.disposition}</td>
                      <td>{new Date(row.applyTime).toLocaleString()}</td>
                      <td>{row.dsa}</td>
                      <td>{row.leadType}</td>
                      <td>
                        <div className={styles.actions}>
                          <Image
                            src={traceImg}
                            alt="Trace"
                            width={20}
                            height={20}
                            className={styles.actionIcon}
                            onClick={()=>handleTrace(row, row.index)}
                          />
                          <FaEye title="View" className={styles.actionIcon} onClick={handleView}  />
                          <a href={`tel:${row.phone}`}><FaPhone title="Call" className={styles.actionIcon} /></a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </>                                                                                                                                                                                                                                                                                                                                                                                                       
  );
};

export default TableComponent;

