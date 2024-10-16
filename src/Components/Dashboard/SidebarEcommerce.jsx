// import { useState } from 'react';
// import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
// // import { Collapse } from 'react-bootstrap'; // If you're using React-Bootstrap for collapsible functionality

// const SidebarEcommerce = () => {
//   const [isOpen, setIsOpen] = useState(true); // Manage collapse state

//   const toggleCollapse = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <li className={`side-nav-item ${isOpen ? 'menuitem-active' : ''}`}>
//       <a
//         data-bs-toggle="collapse"
//         href="#sidebarEcommerce"
//         aria-expanded={isOpen}
//         aria-controls="sidebarEcommerce"
//         className="side-nav-link"
//         onClick={toggleCollapse}
//       >
//         <i className="uil-store"></i>
//         <span> Ecommerce </span>
//         <span className="menu-arrow"></span>
//       </a>
//       <div
//         className={`collapse ${isOpen ? 'show' : ''}`}
//         id="sidebarEcommerce"
//         style={{}}
//       >
//         <ul className="side-nav-second-level">
//           <li className="menuitem-active">
//             <Link href="/apps-ecommerce-products.html">
//               <div className="active">Products</div>
//             </Link>
//           </li>
//           <li>
//             <Link href="/apps-ecommerce-products-details.html">
//               Products Details
//             </Link>
//           </li>
//           <li>
//             <Link href="/apps-ecommerce-orders.html">
//               Orders
//             </Link>
//           </li>
//           <li>
//             <Link href="/apps-ecommerce-orders-details.html" style={{color:"yellow"}}>
//               Order Details
//             </Link>
//           </li>
//           <li>
//             <Link href="/apps-ecommerce-customers.html">
//             Customers
//             </Link>
//           </li>
//           <li>
//             <Link href="/apps-ecommerce-shopping-cart.html">
//                 Shopping Cart
//             </Link>
//           </li>
//           <li>
//             <Link href="/apps-ecommerce-checkout.html">
//              Checkout
//             </Link>
//           </li>
//           <li>
//             <Link href="/apps-ecommerce-sellers.html">
//              Sellers
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </li>
//   );
// };

// export default SidebarEcommerce;

// import React from 'react'
// import { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
// import { Collapse } from 'react-bootstrap'; // If you're using React-Bootstrap for collapsible functionality

// const SidebarEcommerce = () => {

//   useEffect(() => {
//     // Importing Bootstrap JS
//     require('bootstrap/dist/js/bootstrap.bundle.min.js');
//   }, []);

//   return (
//     <div>
//       <li class="side-nav-item">
//                         <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="true" aria-controls="sidebarEcommerce" class="side-nav-link">
//                             <i class="uil-store"></i>
//                             <span> Ecommerce </span>
//                             <span class="menu-arrow"></span>
//                         </a>
//                         <div class="collapse show" id="sidebarEcommerce" style={{}}>
//                             <ul class="side-nav-second-level">
//                                 <li>
//                                     <a href="apps-ecommerce-products.html">Products</a>
//                                 </li>
//                                 <li>
//                                     <a href="apps-ecommerce-products-details.html">Products Details</a>
//                                 </li>
//                                 <li>
//                                     <a href="apps-ecommerce-orders.html">Orders</a>
//                                 </li>
//                                 <li>
//                                     <a href="apps-ecommerce-orders-details.html">Order Details</a>
//                                 </li>
//                                 <li>
//                                     <a href="apps-ecommerce-customers.html">Customers</a>
//                                 </li>
//                                 <li>
//                                     <a href="apps-ecommerce-shopping-cart.html">Shopping Cart</a>
//                                 </li>
//                                 <li>
//                                     <a href="apps-ecommerce-checkout.html">Checkout</a>
//                                 </li>
//                                 <li>
//                                     <a href="apps-ecommerce-sellers.html">Sellers</a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </li>
//     </div>
//   )
// }

// export default SidebarEcommerce

import React, { useState } from 'react';
import Collapse from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SidebarEcommerce = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <li className={`side-nav-item ${isOpen ? 'menuitem-active' : ''}`}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleCollapse();
          }}
          className="side-nav-link"
        >
          <i className="uil-store"></i>
          <span> Ecommerce </span>
          <span className="menu-arrow"></span>
        </a>
        <Collapse in={isOpen}>
          <div id="sidebarEcommerce">
            <ul className="side-nav-second-level">
              <li>
                <a href="apps-ecommerce-products.html">Products</a>
              </li>
              <li>
                <a href="apps-ecommerce-products-details.html">Products Details</a>
              </li>
              <li>
                <a href="apps-ecommerce-orders.html">Orders</a>
              </li>
              <li>
                <a href="apps-ecommerce-orders-details.html">Order Details</a>
              </li>
              <li>
                <a href="apps-ecommerce-customers.html">Customers</a>
              </li>
              <li>
                <a href="apps-ecommerce-shopping-cart.html">Shopping Cart</a>
              </li>
              <li>
                <a href="apps-ecommerce-checkout.html">Checkout</a>
              </li>
              <li>
                <a href="apps-ecommerce-sellers.html">Sellers</a>
              </li>
            </ul>
          </div>
        </Collapse>
      </li>
    </div>
  );
};

export default SidebarEcommerce;


