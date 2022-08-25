import React from 'react';
import './Sidebar.css';

const Sidebar = ({ className , children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default Sidebar;