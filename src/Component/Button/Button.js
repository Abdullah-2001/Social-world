import React from 'react';
import './Button.css';

const Button = ({ title, className, onClick, disable }) => {
    return (
        <button className={className} onClick={onClick} disabled={disable}>{title}</button>
    )
}

export default Button;