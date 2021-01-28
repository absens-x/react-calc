import * as React from 'react';

import Display from './components/Display/Display';
import ButtonGroup from './components/UI/ButtonGroup/ButtonGroup';
import Button from './components/UI/Button/Button';
import calculate from './calculate';
import { ICalcState, IButton } from './types';

import './App.scss';
import './sass/main.scss';

const App: React.FC = () => {
    const [calcState, setCalcState] = React.useState<ICalcState>({
        total: null,
        next: null,
        operation: null,
    });

    const buttonsList: IButton[] = [
        {
            name: 'C',
            title: 'C',
            primary: true,
        },
        {
            name: 'CE',
            title: 'CE',
            primary: true,
        },
        {
            name: 'percent',
            title: '%',
        },
        {
            name: 'del',
            title: 'x',
        },
        {
            name: '7',
            title: '7',
        },
        {
            name: '8',
            title: '8',
        },
        {
            name: '9',
            title: '9',
        },
        {
            name: 'div',
            title: '/',
        },
        {
            name: '4',
            title: '4',
        },
        {
            name: '5',
            title: '5',
        },
        {
            name: '6',
            title: '6',
        },
        {
            name: 'times',
            title: '*',
        },
        {
            name: '1',
            title: '1',
        },
        {
            name: '2',
            title: '2',
        },
        {
            name: '3',
            title: '3',
        },
        {
            name: 'minus',
            title: '-',
        },
        {
            name: 'plusminus',
            title: '+/-',
        },
        {
            name: '0',
            title: '0',
        },
        {
            name: '.',
            title: '.',
        },
        {
            name: 'plus',
            title: '+',
        },
        {
            name: 'pow',
            title: 'pow',
        },
        {
            name: 'sqrt',
            title: 'sqrt',
        },
        {
            name: 'equal',
            title: '=',
            wide: true,
        },
    ];

    function handleClick(buttonName: string): void {
        setCalcState((prevState) => {
            const state: ICalcState = calculate(calcState, buttonName);
            return {
                ...prevState,
                ...state,
            };
        });
    }

    return (
        <div className="App container">
            <div className="wrapper">
                <Display output={calcState.next || calcState.total || '0'} />
                <ButtonGroup>
                    {buttonsList.map((item, i) => {
                        return <Button key={Math.random() * (i + 1)} {...item} clickHandler={handleClick} />;
                    })}
                </ButtonGroup>
            </div>
        </div>
    );
};

export default App;
