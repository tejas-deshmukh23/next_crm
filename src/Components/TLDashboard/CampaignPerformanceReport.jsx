"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './CampaignPerformanceReport.module.css';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx'; // Import XLSX for Excel functionality

const CampaignPerformanceReport = () => {
    const [selectedCampaigns, setSelectedCampaigns] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const dropdownRef = useRef(null); // Create a ref for the dropdown

    const campaigns = ['Smart coin', 'Zype', 'Kinara capital', 'Campaign A', 'Campaign B', 'Campaign C'];

    // Sample data for the table
    const data = Array.from({ length: 320 }, (_, index) => ({
        date: `2024-10-${(index % 30 + 1).toString().padStart(2, '0')}`,
        campaignName: `Campaign ${String.fromCharCode(65 + (index % 3))}`,
        totalCalls: Math.floor(Math.random() * 100),
        answeredCalls: Math.floor(Math.random() * 80),
        missedCalls: Math.floor(Math.random() * 20),
        droppedCalls: Math.floor(Math.random() * 10),
        inBoundCalls: Math.floor(Math.random() * 50),
        outBoundCalls: Math.floor(Math.random() * 50),
        averageHandleTime: `${Math.floor(Math.random() * 10)} mins`,
        averageTalkTime: `${Math.floor(Math.random() * 10)} mins`,
        averageDispositionTime: `${Math.floor(Math.random() * 10)} mins`,
        averagePauseTime: `${Math.floor(Math.random() * 10)} mins`,
        holdCounts: Math.floor(Math.random() * 15),
        transferCalls: Math.floor(Math.random() * 5),
    }));

    const handleCampaignChange = (campaign) => {
        setSelectedCampaigns((prev) =>
            prev.includes(campaign) ? prev.filter(c => c !== campaign) : [...prev, campaign]
        );
    };

    const handleSelectAll = () => {
        if (selectedCampaigns.length === campaigns.length) {
            setSelectedCampaigns([]);
        } else {
            setSelectedCampaigns(campaigns);
        }
    };

    const handleRefresh = () => {
        setSelectedCampaigns([]);
        setStartDate('');
        setEndDate('');
        setSearchTerm(''); // Reset the search term
        setFilteredData([]);
        setDropdownOpen(false); // Close dropdown on refresh
    };

    const handleSearch = () => {
        const filtered = data.filter(item => {
            const dateMatch =
                (!startDate || new Date(item.date) >= new Date(startDate)) &&
                (!endDate || new Date(item.date) <= new Date(endDate));
            const campaignMatch = selectedCampaigns.length === 0 || selectedCampaigns.includes(item.campaignName);
            return dateMatch && campaignMatch;
        });
        setFilteredData(filtered);
    };

    // Filter campaigns based on search term
    const filteredCampaigns = campaigns.filter(campaign => 
        campaign.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10); // Set to 10 for initial view
    const totalRows = filteredData.length;
    const lastIndex = currentPage * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    const currentData = filteredData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
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

    // Function to download data as Excel
    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Campaign Data");
        XLSX.writeFile(workbook, "Campaign_Performance_Report.xlsx");
    };

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            className={styles.container}
        >
            <div className={styles.header}>
                <h2 className={styles.title}>Dialer Campaign Performance Record</h2>
                <button className={styles.downloadButton} onClick={handleDownload}>Download</button> {/* Download button */}
            </div>
            <hr className={styles.horizontalLine} />
            <div className={styles.searchOptions}>
                <div className={styles.searchGroup}>
                    <label className={styles.label}>Select Campaigns:</label>
                    <div className={styles.dropdown} ref={dropdownRef}>
                        <button 
                            className={styles.dropdownButton} 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedCampaigns.length ? `${selectedCampaigns.join(', ')}` : 'Select Campaigns'}
                        </button>
                        {dropdownOpen && (
                            <div className={styles.dropdownContent}>
                                <input
                                    type="text"
                                    placeholder="Search campaigns..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={styles.campaignSearchInput}
                                />
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCampaigns.length === campaigns.length}
                                        onChange={handleSelectAll}
                                    />
                                    Select All
                                </label>
                                {filteredCampaigns.length > 0 ? (
                                    filteredCampaigns.map((campaign, index) => (
                                        <label key={index} className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCampaigns.includes(campaign)}
                                                onChange={() => handleCampaignChange(campaign)}
                                            />
                                            {campaign}
                                        </label>
                                    ))
                                ) : (
                                    <div className={styles.noResults}>No results found</div>
                                )}
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
                    <label htmlFor="rows-per-page">Rows per page:</label>
                    <select 
                        id="rows-per-page" 
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
                                    <th>Index</th> {/* Index column */}
                                    <th>Date</th>
                                    <th>Campaign Name</th>
                                    <th>Total Calls</th>
                                    <th>Answered Calls</th>
                                    <th>Missed Calls</th>
                                    <th>Dropped Calls</th>
                                    <th>In Bound Calls</th>
                                    <th>Out Bound Calls</th>
                                    <th>Average Handle Time</th>
                                    <th>Average Talk Time</th>
                                    <th>Average Disposition Time</th>
                                    <th>Average Pause Time</th>
                                    <th>Hold Counts</th>
                                    <th>Transfer Calls</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{firstIndex + index + 1}</td>
                                        <td>{item.date}</td>
                                        <td>{item.campaignName}</td>
                                        <td>{item.totalCalls}</td>
                                        <td>{item.answeredCalls}</td>
                                        <td>{item.missedCalls}</td>
                                        <td>{item.droppedCalls}</td>
                                        <td>{item.inBoundCalls}</td>
                                        <td>{item.outBoundCalls}</td>
                                        <td>{item.averageHandleTime}</td>
                                        <td>{item.averageTalkTime}</td>
                                        <td>{item.averageDispositionTime}</td>
                                        <td>{item.averagePauseTime}</td>
                                        <td>{item.holdCounts}</td>
                                        <td>{item.transferCalls}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.pagination}>
                        <div className={styles.rowCount}>
                            Showing {firstIndex + 1} to {Math.min(lastIndex, totalRows)} of {totalRows} entries
                        </div>
                        <div className={styles.paginationButtons}>
                            <button onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
                            <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                            <span>{currentPage} of {totalPages}</span>
                            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
                            <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last</button>
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default CampaignPerformanceReport;
