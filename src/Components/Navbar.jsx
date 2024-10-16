// src/components/Navbar.jsx
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  // Define breadcrumbs as an array
  const breadcrumbs = [
    { label: "Apply Record"},
    { label: "Apply Record List", link: "/TableComponent" },
    { label: "Record Details", link: "/TraceComponent" } // Last item shouldn't be a link
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.breadcrumbs}>
        {breadcrumbs.map((item, index) => (
          <span key={index}>
            {item.link ? <Link href={item.link}>{item.label}</Link> : item.label}
            {index < breadcrumbs.length - 1 && ' > '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
