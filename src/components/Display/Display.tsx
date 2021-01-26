import React, { ReactNode } from 'react';
import Digit from '../Digit/Digit';
import './Display.scss';

interface IDisplayProps {
    output: string;
}

interface IDigitPairs {
    [key: string]: string;
}

const Display: React.FC<IDisplayProps> = ({ output }) => {
    const digitsPairs: IDigitPairs = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '.': 'dot',
        e: 'exp',
        '+': 'plus',
        '-': 'minus',
    };

    function renderDigits(output: string): Array<ReactNode> {
        let digits: Array<ReactNode> = [];

        if (!/[^0-9.-]+/.test(output)) {
            digits = output
                .toString()
                .split('')
                .map((item: string, i: number) => {
                    if (+output !== NaN) {
                        return <Digit key={Math.random() * i} className={`icon-num-${digitsPairs[item]}`} />;
                    }
                    return <Digit key={0} className={`icon-num-${digitsPairs[output]}`} />;
                });
        }
        return digits;
    }

    return (
        <div className="display-wrap">
            <h2 className={`output`}>{renderDigits(output) || <i className="icon-num-0"></i>}</h2>
        </div>
    );
};

export default Display;
