import React from 'react';

interface IDigit {
    className: string;
}

const Digit: React.FC<IDigit> = ({ className }) => {
    return <i className={`icon-num ${className}`}></i>;
};

export default Digit;
