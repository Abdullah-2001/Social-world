import React from 'react';
import './Input.css';

const Input = ({ type, placeholder, className, onChange, value }) => {
  return (
    <input value={value} type={type} placeholder={placeholder} className={className} onChange={onChange}></input>
  )
}

export default Input;