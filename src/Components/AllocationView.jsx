"use client";

import React, { useState } from 'react';
import styles from './AllocationView.module.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import DialerAgentPerformanceRecord from './TLDashboard/DialerAgentPerformanceReport';
import CampaignPerformanceReport from './TLDashboard/CampaignPerformanceReport'; // Import your Campaign Performance Report component
import TraceLogReport from './TLDashboard/TraceLogReport'; // Import TraceLogReport component
import { useEffect } from 'react';
import axios from "axios";

// List of states and their major cities in India
const statesWithCities = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
    // Add more states and cities as needed
};

const AllocationView = () => {

    useEffect(()=>{
        getAllSysUsers();
    },[])

    const [globalResponse, setGlobalResponse] = useState([]);
    const [searchedLeads, setSearchedLeads] = useState([]);

    const [searchCriteria, setSearchCriteria] = useState({
        product: '',
        stages: '',
        leadType: '',
        applyTime: '',
        state: '',
        city: '',
        tier: ''
    });

    const [callers, setCallers] = useState([...Array(20).keys()].map(i => ({ name: `Caller ${i + 1}`, selected: false })));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null); // State to manage selected report option
    const [message, setMessage] = useState(""); // State for any messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria(prev => ({ ...prev, [name]: value }));
    };

    const handleReportOptionClick = (option) => {
        setSelectedReport(option); // Set the selected report option
        setIsModalOpen(false); // Close the modal
    };

    const handleBackToOptions = () => {
        setSelectedReport(null); // Reset selected report to show options again
    };

    // const handleCheckboxChange = (index) => {
    //     const newCallers = [...callers];
    //     newCallers[index].selected = !newCallers[index].selected;
    //     console.log("Selected or not :: ",newCallers[index].selected);
    //     setCallers(newCallers);
    // };

    const handleCheckboxChange = (index, caller) => {

        console.log("The callers are :: ",caller);

        const newCallers = [...globalResponse];
        newCallers[index].selected = !newCallers[index].selected;
        console.log("Selected or not :: ", newCallers[index].selected);
        setGlobalResponse(newCallers); // Update the state with the modified array
    };

    const handleSearch = (e) => {
        getSearchedLeads(e);
    };

    // const handlePublish = () => {
    //     // Implement publish functionality here
    //     setMessage("Publish functionality not implemented yet."); // Example message
    // };

    const handlePublish = (e) => {
        // const selectedCallers = globalResponse
        //     .filter(caller => caller.selected) // Filter to get only selected users
            // .map(caller => ({ username: caller.username, id: caller.id })); // Create an object for each selected caller

        const selectedCallers = globalResponse
            .filter(caller => caller.selected) // Filter to get only selected users
            .map(caller => ({ id: caller.id,
                agent_number: caller.agent_number,
                appUserId: caller.appUserId,
                createTime: caller.createTime,
                firstLogin: caller.firstLogin,
                key: caller.key,
                password: caller.password,
                realname: caller.realname,
                role: {
                    code: caller.role.code,
                    createTime: caller.role.createTime,
                    description: caller.role.description,
                    id: caller.role.id,
                    power: caller.role.power,
                    powerDesc: caller.role.powerDesc,
                    title: caller.role.title,
                    updateTime: caller.role.updateTime,
                },
                selected: caller.selected,
                updateTime: caller.updateTime,
                username: caller.username,
                whiteIP: caller.whiteIP
})); 
    
        console.log("Selected callers are ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:", selectedCallers);

        allocateLeadsToUser(e, selectedCallers);
        
        // Use selectedCallers as needed
    };

    const leadType = {
        'Platinum': 0,
        'Gold': 1,
        'Silver': 2,
        'Bronze': 3
    }

    const updateLeadRecords = async (e, formattedTraceTime) => {

        e.preventDefault();
    
        try {
          const index = rowIndex - 1;
          console.log("Inside the updateLeadRecords :: ", globalResponse.data[index], " and the rowIndex is :: ", rowIndex);
    
          console.log("Trace time from the formData is :: ", formData.traceTime);
    
          const formData1 = new FormData();
          formData1.append('')
          
    
          const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}updateLead`, formData1);
    
          console.log(response);
    
          if (response.status === 200) {
    
    
          } else {
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          // console.log(error.response.data);
        }
      };

      const getAllSysUsers=async ()=>{
        // e.preventDefault();
        try {
            
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getAllUsers`);

            if(response.status === 200)
            {

                const usersWithSelection = response.data.map(user => ({
                    ...user, // Copy existing user properties
                    selected: false // Add selected property
                }));
                setGlobalResponse(usersWithSelection);
                // setGlobalResponse(response.data);
            }

        } catch (error) {

            console.log(error);
            
        }
      }

      const allocateLeadsToUser=async (e, selectedCallers)=>{
        e.preventDefault();
        try {
            const formData1 = new FormData();
            console.log("The selected users are :: ",selectedCallers);
            formData1.append('userList', selectedCallers);
            console.log("The searchedLeads are :: ",searchedLeads);
            // formData1.append('applyList', searchedLeads );

        // Create the payload
        const payload = {
            // userList: selectedCallers.map(caller => ({
            //     id: caller.id,
            //     userId: caller.userId,
            //     applyId: caller.applyId,
            //     status: caller.status,
            //     username: caller.username
            // })),
            sysUsers: selectedCallers,
            applyLeads: searchedLeads.map(lead => ({
                apply : {
                id: lead.apply.id,
                agent: lead.apply.agent,
                agentUserId: lead.apply.agentUserId,
                amountselected: lead.apply.amountselected,
                applyPhone: lead.apply.applyPhone,
                applyTime: lead.apply.applyTime,
                call_dispostion: lead.apply.call_dispostion,
                category: lead.apply.category,
                content: lead.apply.content,
                createTime: lead.apply.createTime,
                disbursed: lead.apply.disbursed,
                maxloan: lead.apply.maxloan,
                message: lead.apply.message,
                message1: lead.apply.message1,
                nextActionDate: lead.apply.nextActionDate,
                offline: lead.apply.offline,
                operationId: lead.apply.operationId,
                partnerId: lead.apply.partnerId,
                priority: lead.apply.priority,
                recurring: lead.apply.recurring,
                requestMetaData: lead.apply.requestMetaData,
                responseContent: lead.apply.responseContent,
                salary: lead.apply.salary,
                status: lead.apply.status,
                statusStr: lead.apply.statusStr,
                sub_agent: lead.apply.sub_agent,
                sub_agentUserId: lead.apply.sub_agentUserId,
                tier: lead.apply.tier,
                tierStr: lead.apply.tierStr,
                trace_count: lead.apply.trace_count,
                updateTime: lead.apply.updateTime,
                url: lead.apply.url
            },
                userInfo: {
                        account_holder_name: lead.userInfo?.account_holder_name,
                        account_number: lead.userInfo?.account_number,
                        active: lead.userInfo?.active,
                        address1: lead.userInfo?.address1,
                        address2: lead.userInfo?.address2,
                        addresstype: lead.userInfo?.addresstype,
                        agent: lead.userInfo?.agent,
                        agentUserId: lead.userInfo?.agentUserId,
                        bank_type: lead.userInfo?.bank_type,
                        bankid: lead.userInfo?.bankid,
                        bankname: lead.userInfo?.bankname,
                        branch_name: lead.userInfo?.branch_name,
                        campaign: lead.userInfo?.campaign,
                        cc_present_flag: lead.userInfo?.cc_present_flag,
                        channel: lead.userInfo?.channel,
                        channel0: lead.userInfo?.channel0,
                        city: lead.userInfo?.city,
                        collegename: lead.userInfo?.collegename,
                        comments: lead.userInfo?.comments,
                        company_name: lead.userInfo?.company_name,
                        createTime: lead.userInfo?.createTime,
                        creditprofile: lead.userInfo?.creditprofile,
                        customerID: lead.userInfo?.customerID,
                        degination: lead.userInfo?.degination,
                        deviceId: lead.userInfo?.deviceId,
                        dob: lead.userInfo?.dob,
                        doj: lead.userInfo?.doj,
                        dpd_ninty: lead.userInfo?.dpd_ninty,
                        dpd_oneeighty: lead.userInfo?.dpd_oneeighty,
                        dpd_thirty: lead.userInfo?.dpd_thirty,
                        email: lead.userInfo?.email,
                        emi: lead.userInfo?.emi,
                        fathername: lead.userInfo?.fathername,
                        firstname: lead.userInfo?.firstname,
                        gender: lead.userInfo?.gender,
                        hciemployetype: lead.userInfo?.hciemployetype,
                        hubbleId: lead.userInfo?.hubbleId,
                        id: lead.userInfo?.id,
                        ifsc: lead.userInfo?.ifsc,
                        landmark: lead.userInfo?.landmark,
                        last_attribution_time: lead.userInfo?.last_attribution_time,
                        lastname: lead.userInfo?.lastname,
                        loan_purpose_id: lead.userInfo?.loan_purpose_id,
                        loanamount: lead.userInfo?.loanamount,
                        maritalstatus: lead.userInfo?.maritalstatus,
                        medium: lead.userInfo?.medium,
                        mobilenumber: lead.userInfo?.mobilenumber,
                        mothername: lead.userInfo?.mothername,
                        netbanking: lead.userInfo?.netbanking,
                        nom: lead.userInfo?.nom,
                        noticeTime: lead.userInfo?.noticeTime,
                        officeaddline1: lead.userInfo?.officeaddline1,
                        officeaddline2: lead.userInfo?.officeaddline2,
                        officepincode: lead.userInfo?.officepincode,
                        pan: lead.userInfo?.pan,
                        partnerLoanId: lead.userInfo?.partnerLoanId,
                        paymentType: lead.userInfo?.paymentType,
                        pincode: lead.userInfo?.pincode,
                        profession: lead.userInfo?.profession,
                        qualification: lead.userInfo?.qualification,
                        reference_1_addressline_1: lead.userInfo?.reference_1_addressline_1,
                        reference_1_addressline_2: lead.userInfo?.reference_1_addressline_2,
                        reference_1_name: lead.userInfo?.reference_1_name,
                        reference_1_phone: lead.userInfo?.reference_1_phone,
                        reference_1_pincode: lead.userInfo?.reference_1_pincode,
                        reference_1_relation: lead.userInfo?.reference_1_relation,
                        reference_1_residence_ownership: lead.userInfo?.reference_1_residence_ownership,
                        reference_2_name: lead.userInfo?.reference_2_name,
                        reference_2_phone: lead.userInfo?.reference_2_phone,
                        reference_2_relation: lead.userInfo?.reference_2_relation,
                        regTime: lead.userInfo?.regTime,
                        residence_type: lead.userInfo?.residence_type,
                        salary: lead.userInfo?.salary,
                        smsSource: lead.userInfo?.smsSource,
                        source: lead.userInfo?.source,
                        state: lead.userInfo?.state,
                        status: lead.userInfo?.status,
                        step: lead.userInfo?.step,
                        sub_agent: lead.userInfo?.sub_agent,
                        subagentUserId: lead.userInfo?.subagentUserId,
                        tier: lead.userInfo?.tier,
                        updateTime: lead.userInfo?.updateTime,
                        userId: lead.userInfo?.userId,
                        webSource: lead.userInfo?.webSource,
                        workemail: lead.userInfo?.workemail,
                        yoe: lead.userInfo?.yoe,
                },
                // Add product fields
                product: {
                    amountRange: lead.product?.amountRange,
                    applink: lead.product?.applink,
                    archived: lead.product?.archived,
                    bronze: lead.product?.bronze,
                    cpi: lead.product?.cpi,
                    createTime: lead.product?.createTime,
                    credit_profile: lead.product?.credit_profile,
                    description: lead.product?.description,
                    disburseTime: lead.product?.disburseTime,
                    excludeDsa: lead.product?.excludeDsa,
                    excludeDsaList: lead.product?.excludeDsaList,
                    features: lead.product?.features,
                    featuresList: lead.product?.featuresList,
                    fees: lead.product?.fees,
                    gold: lead.product?.gold,
                    id: lead.product?.id,
                    interestRange: lead.product?.interestRange,
                    logo: lead.product?.logo,
                    maxAmount: lead.product?.maxAmount,
                    maxInterest: lead.product?.maxInterest,
                    maxSalary: lead.product?.maxSalary,
                    maxTenure: lead.product?.maxTenure,
                    max_age: lead.product?.max_age,
                    max_loanamount: lead.product?.max_loanamount,
                    minAmount: lead.product?.minAmount,
                    minExperian: lead.product?.minExperian,
                    minInterest: lead.product?.minInterest,
                    minSalary: lead.product?.minSalary,
                    minTenure: lead.product?.minTenure,
                    min_age: lead.product?.min_age,
                    min_loanamount: lead.product?.min_loanamount,
                    onlyNetpay: lead.product?.onlyNetpay,
                    onlySalary: lead.product?.onlySalary,
                    other: lead.product?.other,
                    others: lead.product?.others,
                    platinum: lead.product?.platinum,
                    process: lead.product?.process,
                    productName: lead.product?.productName,
                    recurring: lead.product?.recurring,
                    rejectionmsg: lead.product?.rejectionmsg,
                    sample: lead.product?.sample,
                    shortDesc: lead.product?.shortDesc,
                    silver: lead.product?.silver,
                    sortcredithaat: lead.product?.sortcredithaat,
                    sortindex: lead.product?.sortindex,
                    status: lead.product?.status,
                    supported: lead.product?.supported,
                    tenureRange: lead.product?.tenureRange,
                    updateTime: lead.product?.updateTime,
                    url: lead.product?.url,
                }
            }))
        };

        console.log("The payload before sending to the user is :: ",payload);
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}allocateLeads`, payload,{
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        });

            if(response.status === 200)
            {
                console.log("Successfull")  
            }

        } catch (error) {

            console.log(error);
            
        }
      }

      const getSearchedLeads = async (e) => {

        console.log("Inside the traceReportDate");

        e.preventDefault();
    
        try {
        //   const index = rowIndex - 1;
        //   console.log("Inside the updateLeadRecords :: ", globalResponse.data[index], " and the rowIndex is :: ", rowIndex);
    
        //   console.log("Trace time from the formData is :: ", formData.traceTime);
    
          const formData1 = new FormData();
          formData1.append('product', searchCriteria.product);
          formData1.append('stages', searchCriteria.stages);
          formData1.append('leadType', searchCriteria.leadType);
          formData1.append('applyTime', searchCriteria.applyTime);
          formData1.append('state', searchCriteria.state);
          formData1.append('city', searchCriteria.city);
        // formData1.append('state', "bihar");
        // formData1.append('city', "patna");
          formData1.append('tier', searchCriteria.tier);

          const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}searchTLPanelLeads`, formData1);
    
          console.log(response);
    
          if (response.status === 200) {
             // Optionally set the filtered data to the fetched data

             console.log("The response is :: ",response);
             setSearchedLeads(response.data);

          } else {

            console.log("Something went wrong and i.e : ");
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          // console.log(error.response.data);
        }
      };

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            className={styles.container}
        >
            <div className={styles.headerContainer}>
                <h1 className={styles.header1}>TL Panel</h1>
                <div className={styles.reportTab} onClick={() => setIsModalOpen(true)}>
                    <span>Download Report</span>
                </div>
            </div>

            {/* Modal for report options */}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Select Report Option</h2>
                        <span>
                            <button onClick={() => setIsModalOpen(false)} className={styles.closeButton}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </span>
                        <div>
                            <button className='reporttab' onClick={() => handleReportOptionClick('Dialer Agent Performance')}>Dialer Agent Performance</button>
                            <button className='reporttab' onClick={() => handleReportOptionClick('Dialer Campaign Performance')}>Dialer Campaign Performance</button>
                            <button className='reporttab' onClick={() => handleReportOptionClick('Report from Trace Log')}>Report from Trace Log</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Render the appropriate report component based on selected report */}
            {selectedReport ? (
                <div className={styles.reportContainer}>
                    <button onClick={handleBackToOptions} className={styles.backButton}>Back to Options</button>
                    {selectedReport === 'Dialer Agent Performance' && <DialerAgentPerformanceRecord reportType={selectedReport} />}
                    {selectedReport === 'Dialer Campaign Performance' && <CampaignPerformanceReport />} {/* Render Campaign Performance Report */}
                    {selectedReport === 'Report from Trace Log' && <TraceLogReport />} {/* Render TraceLogReport */}

                </div>
            ) : (
                <div>
                    <div className={styles.querySection}>
                        {/* Existing search criteria elements */}
                        <select 
                            name="product"
                            value={searchCriteria.product}
                            onChange={handleChange}
                            className={styles.selectInput}
                        >
                            <option value="" disabled>Select Product</option>
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
                            name="stages"
                            value={searchCriteria.stages}
                            onChange={handleChange}
                            className={styles.selectInput}
                        >
                            <option value="" disabled>Select Stages</option>
                            <option value="0">New</option>
                            <option value="3">Closer</option>
                            <option value="2">Incomplete</option>
                        </select>
                        
                        <select
                            name="leadType"
                            value={searchCriteria.leadType}
                            onChange={handleChange}
                            className={styles.selectInput}
                        >
                            <option value="" disabled>Select Lead Type</option>
                            <option value="Platinum">Platinum</option>
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Bronze">Bronze</option>
                        </select>
                        
                        <label>
                            Apply Time: 
                            <input type="datetime-local" name="applyTime" onChange={handleChange} className={styles.input} />
                        </label>
                        
                        <select name="state" onChange={handleChange} className={styles.selectInput}>
                            <option value="" disabled>Select State</option>
                            {Object.keys(statesWithCities).map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                        
                        <select name="city" onChange={handleChange} className={styles.selectInput}>
                            <option value="" disabled>Select City</option>
                            {searchCriteria.state && statesWithCities[searchCriteria.state].map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                        
                        <input type="text" name="tier" placeholder="Tier" onChange={handleChange} className={styles.input} />
                        <button onClick={handleSearch} className={styles.searchButton}>Query</button>
                    </div>

                    <h2 className={styles.header1}>Callers List</h2>
                    <div className={styles.callersSection}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Caller Name</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {callers.map((caller, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{caller.name}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={caller.selected}
                                                onChange={() => handleCheckboxChange(index)}
                                                className={styles.checkbox}
                                            />
                                        </td>
                                    </tr>
                                ))} */}

                                {
                                    globalResponse.map((caller, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{caller.username}</td>
                                            <td>
                                                <input
                                                    type='checkbox'
                                                    checked={caller.selected}
                                                    onChange={() => handleCheckboxChange(index, caller.id, caller)}
                                                    className={styles.checkbox}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={handlePublish} className={styles.publishButton}>Publish</button>
                        {message && <p className={styles.message}>{message}</p>}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default AllocationView;
