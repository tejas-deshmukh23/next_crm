"use client"; // Ensure this is at the top of the file

import Head from 'next/head';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './Login.module.css';
// Import the CSS module
import Image from 'next/image';
import chlogo from '../crmimages/logoCH.png';
import MainPage from '../Dashboard/MainPage';
import TLDashboard from '../TLDashboard/TL';

function LoginPage() {
  const [activeContainer, setActiveContainer] = useState('LoginPage');
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

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
      if (formValues.username === 'tejas' && formValues.password === 'deshmukh') {
        setActiveContainer("MainPage");
      } else if (formValues.username === 'admin' && formValues.password === 'admin') {
        setActiveContainer("TLDashboard");
      }
      // You might want to handle actual login logic here
      console.log('Form submitted:', formValues);
    }
  };

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
