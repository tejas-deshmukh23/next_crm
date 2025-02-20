import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, LogOut } from 'lucide-react';
import TableComponent from "../TableComponent";
import { getToken, setToken } from '@/utils/auth';
import {decodeToken } from '@/utils/auth';
import ApplyOnlineCalledUsers from '../ApplyOnlineCalledUsers';

const MainPage = ({ setActiveContainer }) => {

  const [user, setUser] = useState({});

  const [calledResponse, setCalledResponse] = useState([]);

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
          console.log("The decoded token payload is :: ", payloadObj);

          setUser({
            username: payloadObj.username,
            role: payloadObj.role.title,
            loginId: payloadObj.loginId
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

  const [activeOption, setActiveOption] = useState(null);
  const [activeSubOption, setActiveSubOption] = useState(null);

  const menuOptions = [
    {
      name: 'Apply Records',
      subOptions: ['Apply Records Online', 'Apply Records Offline', 'Online Called Users'],
    },
    {
      name: 'LTPL Records',
      subOptions: ['LTPL Records Option'],
    },
    {
      name: 'BL Leads',
      subOptions: ['BL Leads Option'],
    },
  ];

  const handleOptionClick = (option) => {
    setActiveOption(activeOption === option ? null : option);
    setActiveSubOption(null);
  };

  const handleSubOptionClick = (subOption) => {
    // Reset the state when changing sub-options
    setActiveSubOption(subOption);
  };

  const renderContent = () => {
    if (activeOption === 'Apply Records' && !activeSubOption) {
      return <div>Content for Apply Records</div>;
    }
    if (activeSubOption === 'Apply Records Online') {
      return (
        <TableComponent key={activeSubOption} subOption={activeSubOption} loginId={user.loginId} setCalledResponse={setCalledResponse} calledResponse={calledResponse} activeSubOption={activeSubOption}/>
      );
    }
    if (activeSubOption === 'Apply Records Offline') {
      return (
        // <TableComponent key={activeSubOption} subOption={activeSubOption} loginId={user.loginId} />
        <div>Here we will show Offline Records</div>
      );
    }
    if (activeSubOption === 'Online Called Users') {
      return (
        <>
          <div>Called Users</div>
          {
            <ApplyOnlineCalledUsers setCalledResponse={setCalledResponse} calledResponse={calledResponse} key={activeSubOption} subOption={activeSubOption} loginId={user.loginId}/>
          }
          
        </>
      );
    }
    if (activeOption === 'LTPL Records' && !activeSubOption) {
      return <div>Content for LTPL Records Option</div>;
    }
    if (activeOption === 'BL Leads' && !activeSubOption) {
      return <div>Content for BL Leads Option</div>;
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.div
        className="w-64 bg-indigo-900 text-white p-6 flex flex-col"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-8">
          <img
            src="https://via.placeholder.com/100"
            alt="User Profile"
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div>
            <div className="font-semibold">{user.username}</div>
            <div className="text-sm text-indigo-300">{user.role}</div>
          </div>
        </div>

        <nav className="flex-1">
          {menuOptions.map((option) => (
            <div key={option.name} className="mb-4">
              <button
                onClick={() => handleOptionClick(option.name)}
                className={`w-full text-left py-2 px-4 rounded transition-colors ${
                  activeOption === option.name
                    ? 'bg-white text-indigo-900'
                    : 'hover:bg-indigo-800'
                }`}
              >
                <span>{option.name}</span>
                <ChevronRight
                  className={`float-right transition-transform ${
                    activeOption === option.name ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {activeOption === option.name && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {option.subOptions.map((subOption) => (
                    <button
                      key={subOption}
                      onClick={() => handleSubOptionClick(subOption)}
                      className={`w-full text-left py-2 px-6 text-sm transition-colors ${
                        activeSubOption === subOption
                          ? 'bg-indigo-700 text-white'
                          : 'text-indigo-300 hover:text-white'
                      }`}
                    >
                      {subOption}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        <button
          onClick={() => setActiveContainer("LoginPage")}
          className="mt-auto py-2 px-4 rounded flex items-center text-indigo-300 hover:text-white transition-colors"
        >
          <LogOut className="mr-2" size={18} />
          Log Out
        </button>
      </motion.div>

      <div className="flex-1 p-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>   
      </div>
    </div>
  );
};

export default MainPage;
