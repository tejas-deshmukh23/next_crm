import React from 'react'
import SidebarEcommerce from './SidebarEcommerce'

const MainPage2 = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
    <div
      className="sidebar"
      style={{
        width: '250px',
        backgroundColor: '#3e2780',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '20px',
        overflowY: 'auto',
      }}
    >
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <img
          src="https://via.placeholder.com/100"
          alt="User Profile"
          style={{
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            objectFit: 'cover',
          }}
        />
        <div style={{ color: 'white', marginLeft: '10px' }}>
          <div>User Name</div>
          <div>Role</div>
        </div>
      </div>

          
          <SidebarEcommerce/>
      
    </div>
  </div>
  )
}

export default MainPage2
