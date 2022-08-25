import React from 'react';
import './Card.css';

const Card = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default Card;