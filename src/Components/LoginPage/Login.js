"use client"; // Ensure this is at the top of the file

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './Login.module.css';
// Import the CSS module
import Image from 'next/image';
import chlogo from '../crmimages/logoCH.png';
import MainPage from '../Dashboard/MainPage';
import TLDashboard from '../TLDashboard/TL';
import { getToken, setToken } from '@/utils/auth';
import axios from "axios";
import {decodeToken } from '@/utils/auth';

function LoginPage() {

  const [activeContainer, setActiveContainer] = useState('');
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  const [user, setUser] = useState(null);

  useEffect(()=>{
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
          });

          // if (payloadObj.username === 'admin' && payloadObj.role.title === 'Techsuper') {
          //   setActiveContainer("TLDashboard");
          // }
          if(payloadObj.role.title === 'Administrator' || payloadObj.role.title === 'Techsuper' || payloadObj.role.title === 'Teamlead' ){
            console.log("Inside useEffect when if is true");
            setActiveContainer("TLDashboard");
          } else {
            console.log("Inside useEffect when if is false or else");
            setActiveContainer("MainPage");
          }
        }
      }
    }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    // Clear error messages for the corresponding field
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let newErrors = { username: '', password: '' };

    // Validate username and password
    if (!formValues.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }
    if (!formValues.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      handleLogin(e);
      // if (formValues.username === 'tejas' && formValues.password === 'deshmukh') {
      //   console.log("true");
      //   setActiveContainer("MainPage");
      // } else if (formValues.username === 'admin' && formValues.password === 'admin') {
      //   setActiveContainer("TLDashboard");
      // }
      // You might want to handle actual login logic here
      console.log('Form submitted:', formValues);
    }
  };

  const handleLogin=async(e)=>{
    console.log("Inside the handleLOgin");
    e.preventDefault();
    try{
      const formData1 = new FormData();
      formData1.append('username', formValues.username);
      formData1.append('password', formValues.password);

      console.log("Before handle post");

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}validate`,formData1)

      console.log("After handle post");
      
      if(response.status === 200)
      {
        setToken(response.data.token);

        const token = getToken();
        if (token) {
          const decodedToken = decodeToken(token);
          if (decodedToken && decodedToken.payload) {
            const payloadObj = JSON.parse(decodedToken.payload);
            console.log("The decoded token payload is :: ", payloadObj);
  
            setUser({
              username: payloadObj.username,
              role: payloadObj.role.title,
            });
  
            // if (payloadObj.username === 'admin' && payloadObj.role.title === 'Techsuper') {
            //   console.log("Inside if");
            //   setActiveContainer("TLDashboard");
            // } else {
            //   console.log("Inside else");
            //   setActiveContainer("MainPage");
            // }

            if(payloadObj.role.title === 'Administrator' || payloadObj.role.title === 'Techsuper' || payloadObj.role.title === 'Teamlead')
            {
              setActiveContainer("TLDashboard");
            }else{
              setActiveContainer("MainPage");
            }
          }
        }

        

        console.log("The Token is :: ",getToken());
        console.log("The login response is :: ",response);
      }else{
        console.log("The login response when failed is :: ",response);
      }

    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      {activeContainer === 'MainPage' && <MainPage />}
      {activeContainer === 'TLDashboard' && <TLDashboard />}
      {activeContainer === 'LoginPage' && (
        <>
          <Head>
            <title>Login Page</title>
          </Head>
          <div className={styles.container}>
            <div className={styles.formContainer}>
              <div className={styles.logoContainer}>
                <Image src={chlogo} alt="CheditHaat" height={80} width={80} className={styles.logo} />
              </div>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label htmlFor="username" className={styles.label}>Username</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.iconWrapper}>
                      <FontAwesomeIcon icon={faUser} className={styles.icon} />
                    </span>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={styles.input}
                      value={formValues.username}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.username && <p className={styles.error}>{errors.username}</p>}
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="password" className={styles.label}>Password</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.iconWrapper}>
                      <FontAwesomeIcon icon={faLock} className={styles.icon} />
                    </span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={styles.input}
                      value={formValues.password}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && <p className={styles.error}>{errors.password}</p>}
                </div>
                <button type="submit" className={styles.button}>Login</button>
              </form>
            </div>

          </div>
        </>
      )}
    </>
  );
}

export default LoginPage;
