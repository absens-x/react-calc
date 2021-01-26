import React from 'react';
import './ButtonGroup.scss';

interface IButtonGroup {
    children: React.ReactNode;
}

const ButtonGroup: React.FC<IButtonGroup> = ({ children }) => <div className="button-group row">{children}</div>;

export default ButtonGroup;
