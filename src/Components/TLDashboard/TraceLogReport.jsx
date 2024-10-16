// "use client"; // This marks the component as a Client Component

// import React, { useState, useEffect, useRef } from 'react';
// import styles from './TraceLogReport.module.css'; // Ensure the appropriate CSS file is created
// import * as XLSX from 'xlsx'; // Import XLSX for Excel functionality
// import axios from "axios";

// const TraceLogReport = () => {
//     const [selectedProducts, setSelectedProducts] = useState([]); // State for selected Products
//     const [startDate, setStartDate] = useState(''); // State for start date
//     const [endDate, setEndDate] = useState(''); // State for end date
//     const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown open state
//     const [currentPage, setCurrentPage] = useState(1); // Current page in pagination
//     const [rowsPerPage, setRowsPerPage] = useState(20); // Rows per page for pagination
//     const [filteredData, setFilteredData] = useState([]); // Filtered data based on criteria
//     const [productSearchTerm, setProductSearchTerm] = useState(''); // Search term for Products

//     const dropdownRef = useRef(null); // Reference for dropdown

//     const products = ['Product A', 'Product B', 'Product C']; // Sample Products data

//     // Sample data for the trace log report with 15 fields
//     const data = Array.from({ length: 320 }, (_, index) => ({
//         id: index + 1, // Unique ID for each entry
//         date: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')}`,
//         intercomID: `ID${index + 1}`,
//         caller: `Caller ${index + 1}`,
//         reason: `Reason ${Math.ceil(index / 10)}`,
//         applyId: `AP${index + 1}`,
//         createTime: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')} 09:00`,
//         updateTime: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')} 17:00`,
//         content: `Content for entry ${index + 1}`,
//         productName: `Product ${Math.ceil(index / 10)}`,
//         traceTime: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')} 10:00`,
//         userPhone: `123456789${index % 10}`,
//         nextActionDate: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')} 11:00`,
//         customerTraceId: `CT${index + 1}`,
//         Content1: `Extra Info ${index + 1}`, // Placeholder for additional fields
//         Reason1: `Detail ${Math.ceil(index / 10)}`, // Placeholder for additional fields
//     }));

//     // Handle Products selection
//     const handleProductChange = (product) => {
//         setSelectedProducts((prev) =>
//             prev.includes(product) ? prev.filter(a => a !== product) : [...prev, product]
//         );
//     };

//     // Handle selecting all Products
//     const handleSelectAll = () => {
//         if (selectedProducts.length === products.length) {
//             setSelectedProducts([]);
//         } else {
//             setSelectedProducts(products);
//         }
//     };

//     // Refresh the filters and state
//     const handleRefresh = () => {
//         setSelectedProducts([]);
//         setStartDate('');
//         setEndDate('');
//         setFilteredData([]);
//         setCurrentPage(1);
//         setProductSearchTerm('');
//     };

//     // Search logic for filtering data based on selected criteria
//     const handleSearch = (e) => {

//         traceReportByDate(e);

//         const filtered = data.filter(item => {
//             const dateMatch =
//                 (!startDate || new Date(item.createTime) >= new Date(startDate)) &&
//                 (!endDate || new Date(item.createTime) <= new Date(endDate));
//             const productMatch = selectedProducts.length === 0 || selectedProducts.includes(item.caller);
//             return dateMatch && productMatch;
//         });
//         setFilteredData(filtered);
//         setCurrentPage(1); // Reset to the first page
//     };

//     // Pagination Logic
//     const totalRows = filteredData.length;
//     const lastIndex = currentPage * rowsPerPage;
//     const firstIndex = lastIndex - rowsPerPage;
//     const currentData = filteredData.slice(firstIndex, lastIndex);
//     const totalPages = Math.ceil(totalRows / rowsPerPage);

//     // Pagination handlers
//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(prev => prev + 1);
//         }
//     };

//     const handlePrev = () => {
//         if (currentPage > 1) {
//             setCurrentPage(prev => prev - 1);
//         }
//     };

//     const handleFirstPage = () => {
//         setCurrentPage(1);
//     };

//     const handleLastPage = () => {
//         setCurrentPage(totalPages);
//     };

//     // Handle clicks outside the dropdown to close it
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [dropdownRef]);

//     // Filter Products based on the search term
//     const filteredProducts = products.filter(product =>
//         product.toLowerCase().includes(productSearchTerm.toLowerCase())
//     );

//     // Function to download data as Excel
//     const handleDownload = () => {
//         const worksheet = XLSX.utils.json_to_sheet(filteredData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "TraceLogReport");
//         XLSX.writeFile(workbook, "TraceLogReport.xlsx");
//     };

//     const traceReportByDate = async (e) => {

//         console.log("Inside the traceReportDate");

//         e.preventDefault();
    
//         try {
//         //   const index = rowIndex - 1;
//         //   console.log("Inside the updateLeadRecords :: ", globalResponse.data[index], " and the rowIndex is :: ", rowIndex);
    
//         //   console.log("Trace time from the formData is :: ", formData.traceTime);
    
//           const formData1 = new FormData();
//           formData1.append('startDate', startDate);
//           formData1.append('endDate', endDate);
//           const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}traceByDate`, formData1);
    
//           console.log(response);
    
//           if (response.status === 200) {
//             console.log("Response for traec between dates are :: ",response);
    
//           } else {

//             console.log("Something went wrong");
//           }
//         } catch (error) {
//           console.error('Error submitting form:', error);
//           // console.log(error.response.data);
//         }
//       };

//     return (
//         <div className={styles.container}>
//             <div className={styles.header}>
//                 <h2 className={styles.title}>Trace Log Report</h2>
//                 <button className={styles.downloadButton} onClick={handleDownload}>Download</button>
//             </div>
//             <hr className={styles.horizontalLine} />
//             <div className={styles.searchOptions}>
//                 <div className={styles.searchGroup}>
//                     <label className={styles.label}>Select Products:</label>
//                     <div className={styles.dropdown} ref={dropdownRef}>
//                         <button 
//                             className={styles.dropdownButton} 
//                             onClick={() => setDropdownOpen(!dropdownOpen)}
//                         >
//                             {selectedProducts.length ? selectedProducts.join(', ') : 'Select Products'}
//                         </button>
//                         {dropdownOpen && (
//                             <div className={styles.dropdownContent}>
//                                 <input 
//                                     type="text"
//                                     placeholder="Search Products..."
//                                     value={productSearchTerm}
//                                     onChange={(e) => setProductSearchTerm(e.target.value)}
//                                     className={styles.productSearchInput}
//                                 />
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedProducts.length === products.length}
//                                         onChange={handleSelectAll}
//                                     />
//                                     Select All
//                                 </label>
//                                 {filteredProducts.map((product, index) => (
//                                     <label key={index} className={styles.checkboxLabel}>
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedProducts.includes(product)}
//                                             onChange={() => handleProductChange(product)}
//                                         />
//                                         {product}
//                                     </label>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div className={styles.searchGroup}>
//                     <label className={styles.label} htmlFor="start-date">Start Date:</label>
//                     <input
//                         type="date"
//                         id="start-date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         className={styles.dateInput}
//                     />
//                 </div>

//                 <div className={styles.searchGroup}>
//                     <label className={styles.label} htmlFor="end-date">End Date:</label>
//                     <input
//                         type="date"
//                         id="end-date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         className={styles.dateInput}
//                     />
//                 </div>

//                 <button className={styles.searchButton} onClick={handleSearch}>Search</button>
//                 <button className={styles.refreshButton} onClick={handleRefresh}>Refresh</button>
                
//                 <div className={styles.rowsPerPage}>
//                     <label htmlFor="rowsPerPage">Rows per page:</label>
//                     <select 
//                         id="rowsPerPage"
//                         value={rowsPerPage}
//                         onChange={(e) => {
//                             setRowsPerPage(Number(e.target.value));
//                             setCurrentPage(1); // Reset to the first page on rows per page change
//                         }}
//                         className={styles.rowsPerPageSelect}
//                     >
//                         <option value={10}>10</option>
//                         <option value={20}>20</option>
//                         <option value={50}>50</option>
//                         <option value={100}>100</option>
//                     </select>
//                 </div>
//             </div>

//             {filteredData.length > 0 && (
//                 <>
//                     <div className={styles.tableContainer} style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                         <table className={styles.dataTable}>
//                             <thead>
//                                 <tr>
//                                     <th>Index</th>
//                                     <th>ID</th>
//                                     <th>Create Time</th>
//                                     <th>Update Time</th>
//                                     <th>Apply ID</th>
//                                     <th>Caller</th>
//                                     <th>Content</th>
//                                     <th>Product Name</th>
//                                     <th>Trace Time</th>
//                                     <th>User Phone</th>
//                                     <th>Next Action Date</th>
//                                     <th>Reason</th>
//                                     <th>Customer Trace ID</th>
//                                     <th>Content 1</th>
//                                     <th>Reason 1</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentData.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{firstIndex + index + 1}</td>
//                                         <td>{item.id}</td>
//                                         <td>{item.createTime}</td>
//                                         <td>{item.updateTime}</td>
//                                         <td>{item.applyId}</td>
//                                         <td>{item.caller}</td>
//                                         <td>{item.content}</td>
//                                         <td>{item.productName}</td>
//                                         <td>{item.traceTime}</td>
//                                         <td>{item.userPhone}</td>
//                                         <td>{item.nextActionDate}</td>
//                                         <td>{item.reason}</td>
//                                         <td>{item.customerTraceId}</td>
//                                         <td>{item.Content1}</td>
//                                         <td>{item.Reason1}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className={styles.pagination}>
//                         <div className={styles.rowCount}>
//                             <span>{`Rows ${firstIndex + 1} - ${Math.min(lastIndex, totalRows)} of ${totalRows}`}</span>
//                         </div>
//                         <div className={styles.paginationButtons}>
//                             <button onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
//                             <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
//                             <span>{`Page ${currentPage} of ${totalPages}`}</span>
//                             <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
//                             <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last</button>
//                         </div>
//                     </div>
//                 </>
//             )}
//             {filteredData.length === 0 && <p>No results found for the current search criteria.</p>}
//         </div>
//     );
// };

// export default TraceLogReport;

"use client"; // This marks the component as a Client Component

import React, { useState, useEffect, useRef } from 'react';
import styles from './TraceLogReport.module.css'; // Ensure the appropriate CSS file is created
import * as XLSX from 'xlsx'; // Import XLSX for Excel functionality
import axios from "axios";

const TraceLogReport = () => {

    

    const [allData, setAllData] = useState([]); // State to hold all fetched data


    const [selectedProducts, setSelectedProducts] = useState([]); // State for selected Products
    const [startDate, setStartDate] = useState(''); // State for start date
    const [endDate, setEndDate] = useState(''); // State for end date
    const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown open state
    const [currentPage, setCurrentPage] = useState(1); // Current page in pagination
    const [rowsPerPage, setRowsPerPage] = useState(20); // Rows per page for pagination
    const [filteredData, setFilteredData] = useState([]); // Filtered data based on criteria
    const [productSearchTerm, setProductSearchTerm] = useState(''); // Search term for Products

    const dropdownRef = useRef(null); // Reference for dropdown

    const products = ['PaySense', 'MoneyTap', 'CASHe','EarlySalary','NIRA','LoanTap','MoneyView','SalaryDost','Billioncash','Kredit One','SmartCoin',
'Avail Finance','Galaxy Card','Upwords','InstaRupee','True Balance','Phocket','ZestMoney','InstaMoney','FinHeal','NAVI','PayMe','Stash Fin','Tala-Credit Builder',
'mPokket','FairMoney','RupeeRedee','Rapid Rupee','slice-Visa Card','Bajaj Finserv','Fulletron','Indifi','Finnable','HomeCredit','Finzy',
'FlexiLoans','Kinara','TataCapital','KreditBee','Prefr','Privo','InActive','Incred','IIFL-PL','IIFL-BL','FatakPay','MoneyWide','MobiKwik-Zip Loan',
'IIFL-GOLD-LOAN','IDFC','Zype','Kissht','Freed','Aditya Birla Capital','LTFS','Tata neu','Aspire-BL','Trust Paisa','branch','HDFC-Credit Card','Loan on Card']; // Sample Products data

    // Sample data for the trace log report with 15 fields
    const data = Array.from({ length: 320 }, (_, index) => ({
        id: index + 1, // Unique ID for each entry
        date: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')}`,
        intercomID: `ID${index + 1}`,
        caller: `Caller ${index + 1}`,
        reason: `Reason ${Math.ceil(index / 10)}`,
        applyId: `AP${index + 1}`,
        createTime: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')} 09:00`,
        updateTime: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')} 17:00`,
        content: `Content for entry ${index + 1}`,
        productName: `Product ${Math.ceil(index / 10)}`,
        traceTime: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')} 10:00`,
        userPhone: `123456789${index % 10}`,
        nextActionDate: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')} 11:00`,
        customerTraceId: `CT${index + 1}`,
        Content1: `Extra Info ${index + 1}`, // Placeholder for additional fields
        Reason1: `Detail ${Math.ceil(index / 10)}`, // Placeholder for additional fields
    }));

    // Handle Products selection
    const handleProductChange = (product) => {
        setSelectedProducts((prev) =>
            prev.includes(product) ? prev.filter(a => a !== product) : [...prev, product]
        );
    };

    // Handle selecting all Products
    const handleSelectAll = () => {
        if (selectedProducts.length === products.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(products);
        }
    };

    // Refresh the filters and state
    const handleRefresh = () => {
        setSelectedProducts([]);
        setStartDate('');
        setEndDate('');
        setFilteredData([]);
        setCurrentPage(1);
        setProductSearchTerm('');
    };

    // Search logic for filtering data based on selected criteria
    const handleSearch = (e) => {

        console.log("Selected Products are :: ",selectedProducts);
        traceReportByDate(e);
        

        const filtered = allData.filter(item => {
            const dateMatch =
                (!startDate || new Date(item.createTime) >= new Date(startDate)) &&
                (!endDate || new Date(item.createTime) <= new Date(endDate));
            const productMatch = selectedProducts.length === 0 || selectedProducts.includes(item.caller);
            return dateMatch && productMatch;
        });
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to the first page
    };

    // Pagination Logic
    const totalRows = filteredData.length;
    const lastIndex = currentPage * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    const currentData = filteredData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Pagination handlers
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // Filter Products based on the search term
    const filteredProducts = products.filter(product =>
        product.toLowerCase().includes(productSearchTerm.toLowerCase())
    );

    // Function to download data as Excel
    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "TraceLogReport");
        XLSX.writeFile(workbook, "TraceLogReport.xlsx");
    };

    const traceReportByDate = async (e) => {

        console.log("Inside the traceReportDate");

        e.preventDefault();
    
        try {
        //   const index = rowIndex - 1;
        //   console.log("Inside the updateLeadRecords :: ", globalResponse.data[index], " and the rowIndex is :: ", rowIndex);
    
        //   console.log("Trace time from the formData is :: ", formData.traceTime);
    
          const formData1 = new FormData();
          formData1.append('startDate', startDate);
          formData1.append('endDate', endDate);
          formData1.append('product', selectedProducts);
          const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}traceByDate`, formData1);
    
          console.log(response);
    
          if (response.status === 200) {
            console.log("Response for traec between dates are :: ",response);
            setAllData(response.data); // Store the fetched data
            setFilteredData(response.data); // Optionally set the filtered data to the fetched data

          } else {

            console.log("Something went wrong");
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          // console.log(error.response.data);
        }
      };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Trace Log Report</h2>
                <button className={styles.downloadButton} onClick={handleDownload}>Download</button>
            </div>
            <hr className={styles.horizontalLine} />
            <div className={styles.searchOptions}>
                <div className={styles.searchGroup}>
                    <label className={styles.label}>Select Products:</label>
                    <div className={styles.dropdown} ref={dropdownRef}>
                        <button 
                            className={styles.dropdownButton} 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedProducts.length ? selectedProducts.join(', ') : 'Select Products'}
                        </button>
                        {dropdownOpen && (
                            <div className={styles.dropdownContent}>
                                <input 
                                    type="text"
                                    placeholder="Search Products..."
                                    value={productSearchTerm}
                                    onChange={(e) => setProductSearchTerm(e.target.value)}
                                    className={styles.productSearchInput}
                                />
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.length === products.length}
                                        onChange={handleSelectAll}
                                    />
                                    Select All
                                </label>
                                {filteredProducts.map((product, index) => (
                                    <label key={index} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product)}
                                            onChange={() => handleProductChange(product)}
                                        />
                                        {product}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.searchGroup}>
                    <label className={styles.label} htmlFor="start-date">Start Date:</label>
                    <input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={styles.dateInput}
                    />
                </div>

                <div className={styles.searchGroup}>
                    <label className={styles.label} htmlFor="end-date">End Date:</label>
                    <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles.dateInput}
                    />
                </div>

                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
                <button className={styles.refreshButton} onClick={handleRefresh}>Refresh</button>
                
                <div className={styles.rowsPerPage}>
                    <label htmlFor="rowsPerPage">Rows per page:</label>
                    <select 
                        id="rowsPerPage"
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to the first page on rows per page change
                        }}
                        className={styles.rowsPerPageSelect}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>

            {filteredData.length > 0 && (
                <>
                    <div className={styles.tableContainer} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>ID</th>
                                    <th>Create Time</th>
                                    <th>Update Time</th>
                                    <th>Apply ID</th>
                                    <th>Caller</th>
                                    <th>Content</th>
                                    <th>Product Name</th>
                                    <th>Trace Time</th>
                                    <th>User Phone</th>
                                    <th>Next Action Date</th>
                                    <th>Reason</th>
                                    <th>Customer Trace ID</th>
                                    <th>Content 1</th>
                                    <th>Reason 1</th>
                                </tr>
                            </thead>
                            <tbody>
    {currentData.map((item, index) => {
        // Mapping of reason to status
        const reasonStatusMapping = {
            0: 'Cx not interested',
            1: 'Cx does not receive salary in account',
            2: 'Cx is not salaried',
            3: 'Cx does not meet criteria of lenders',
            // Add more mappings as needed
        };

        // Get the status based on item.reason
        const status = reasonStatusMapping[item.reason] || ''; // Fallback if reason doesn't match

        return (
            <tr key={index}>
                <td>{firstIndex + index + 1}</td>
                <td>{item.id}</td>
                <td>{item.createTime}</td>
                <td>{item.updateTime}</td>
                <td>{item.applyId}</td>
                <td>{item.caller}</td>
                <td>{item.content}</td>
                <td>{item.productName}</td>
                <td>{item.traceTime}</td>
                <td>{item.userPhone}</td>
                <td>{item.nextActionDate}</td>
                <td>{status}</td> {/* Display the status here */}
                <td>{item.customerTraceId}</td>
                <td>{item.content1}</td>
                <td>{item.reason1}</td>
            </tr>
        );
    })}
</tbody>

                        </table>
                    </div>

                    <div className={styles.pagination}>
                        <div className={styles.rowCount}>
                            <span>{`Rows ${firstIndex + 1} - ${Math.min(lastIndex, totalRows)} of ${totalRows}`}</span>
                        </div>
                        <div className={styles.paginationButtons}>
                            <button onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
                            <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
                            <span>{`Page ${currentPage} of ${totalPages}`}</span>
                            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
                            <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last</button>
                        </div>
                    </div>
                </>
            )}
            {filteredData.length === 0 && <p>No results found for the current search criteria.</p>}
        </div>
    );
};

export default TraceLogReport;

