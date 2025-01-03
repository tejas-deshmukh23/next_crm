"use client"

import React, { useState, useEffect, useRef } from 'react';
import styles from './DialerAgentPerformanceReport.module.css';
import * as XLSX from 'xlsx'; // Import XLSX for Excel functionality

const DialerAgentPerformanceRecord = () => {
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filteredData, setFilteredData] = useState([]);
  const [agentSearchTerm, setAgentSearchTerm] = useState(''); // New state for agent search term

  const dropdownRef = useRef(null); // Reference for dropdown

  const agents = ['Agent A', 'Agent B', 'Agent C']; // Sample agent data

  // Sample data for the table
  const data = Array.from({ length: 320 }, (_, index) => ({
    date: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')}`,
    agentName: `Agent ${String.fromCharCode(65 + (index % 3))}`,
    intercomID: `ID${index + 1}`,
    firstLogin: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')} 09:00`,
    lastLogin: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')} 17:00`,
    campaignName: `Campaign ${Math.ceil(index / 10)}`,
    totalCalls: Math.floor(Math.random() * 100),
    averageCallsPerDay: Math.floor(Math.random() * 10),
    totalAnsweredCalls: Math.floor(Math.random() * 80),
    totalRingDuration: `${Math.floor(Math.random() * 60)} mins`,
    totalInCallDuration: `${Math.floor(Math.random() * 40)} mins`,
    loginDuration: `${Math.floor(Math.random() * 8)} hrs ${Math.floor(Math.random() * 60)} mins`,
  }));

  const handleAgentChange = (agent) => {
    setSelectedAgents((prev) =>
      prev.includes(agent) ? prev.filter(a => a !== agent) : [...prev, agent]
    );
  };

  const handleSelectAll = () => {
    if (selectedAgents.length === agents.length) {
      setSelectedAgents([]);
    } else {
      setSelectedAgents(agents);
    }
  };

  const handleRefresh = () => {
    setSelectedAgents([]);
    setStartDate('');
    setEndDate('');
    setFilteredData([]);
    setCurrentPage(1);
    setAgentSearchTerm(''); // Reset the search term
  };

  const handleSearch = () => {
    const filtered = data.filter(item => {
      const dateMatch =
        (!startDate || new Date(item.date) >= new Date(startDate)) &&
        (!endDate || new Date(item.date) <= new Date(endDate));
      const agentMatch = selectedAgents.length === 0 || selectedAgents.includes(item.agentName);
      return dateMatch && agentMatch;
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

  // Filter agents based on the search term
  const filteredAgents = agents.filter(agent => 
    agent.toLowerCase().includes(agentSearchTerm.toLowerCase())
  );

  // Function to download data as Excel
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agent Data");
    XLSX.writeFile(workbook, "Agent_Performance_Report.xlsx");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Dialer Agent Performance Record</h2>
        <button className={styles.downloadButton} onClick={handleDownload}>Download</button> {/* Download button */}
      </div>
      <hr className={styles.horizontalLine} />
      <div className={styles.searchOptions}>
        <div className={styles.searchGroup}>
          <label className={styles.label}>Select Agents:</label>
          <div className={styles.dropdown} ref={dropdownRef}>
            <button 
              className={styles.dropdownButton} 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedAgents.length ? selectedAgents.join(', ') : 'Select Agents'}
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownContent}>
                <input 
                  type="text"
                  placeholder="Search agents..."
                  value={agentSearchTerm}
                  onChange={(e) => setAgentSearchTerm(e.target.value)}
                  className={styles.agentSearchInput}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={selectedAgents.length === agents.length}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
                {filteredAgents.map((agent, index) => (
                  <label key={index} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedAgents.includes(agent)}
                      onChange={() => handleAgentChange(agent)}
                    />
                    {agent}
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
          <div className={styles.tableContainer} style={{ maxHeight: '400px', overflowY: 'auto' }}> {/* Add scrollable styling */}
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Index</th> {/* Added index header */}
                  <th>Date</th>
                  <th>Agent Name</th>
                  <th>Intercom ID</th>
                  <th>First Login</th>
                  <th>Last Login</th>
                  <th>Campaign Name</th>
                  <th>Total Calls</th>
                  <th>Average Calls/Day</th>
                  <th>Total Answered Calls</th>
                  <th>Total Ring Duration</th>
                  <th>Total In-call Duration</th>
                  <th>Login Duration</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, index) => (
                  <tr key={index}>
                    <td>{firstIndex + index + 1}</td> {/* Index column */}
                    <td>{row.date}</td>
                    <td>{row.agentName}</td>
                    <td>{row.intercomID}</td>
                    <td>{row.firstLogin}</td>
                    <td>{row.lastLogin}</td>
                    <td>{row.campaignName}</td>
                    <td>{row.totalCalls}</td>
                    <td>{row.averageCallsPerDay}</td>
                    <td>{row.totalAnsweredCalls}</td>
                    <td>{row.totalRingDuration}</td>
                    <td>{row.totalInCallDuration}</td>
                    <td>{row.loginDuration}</td>
                  </tr>
                ))}
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
    </div>
  );
};

export default DialerAgentPerformanceRecord;
