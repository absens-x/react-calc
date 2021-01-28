import Big, { BigSource } from 'big.js';
import { ICalcState } from './types';

/**
 * Operate and return result
 */

Big.DP = 4;
function operate(numOne: BigSource, numTwo: BigSource, operation: string) {
    const one: BigSource = Big(numOne || '0');
    const two: BigSource = Big(numTwo || (operation === '+' || operation === 'x' ? '1' : '0'));

    if (operation === 'plus') {
        return one.plus(two).toString();
    }

    if (operation === 'minus') {
        return one.minus(two).toString();
    }

    if (operation === 'times') {
        return one.times(two).toString();
    }

    if (operation === 'pow') {
        return one.pow(+two).toString();
    }

    if (operation === 'sqrt') {
        return two.sqrt().toString();
    }

    if (operation === 'div') {
        if (two.toString() === '0') {
            alert('Divide by 0 error');
            return '0';
        } else {
            return one.div(two).toString();
        }
    }
    throw Error(`Unknown operation '${operation}'`);
}

/**
 * Calculate and return state
 */

export default function calculate(state: ICalcState, buttonName: string): ICalcState {
    if (buttonName === 'C') {
        return {
            total: null,
            next: null,
            operation: null,
        };
    }

    if (buttonName === 'CE') {
        if (state.next) {
            return {
                next: '0',
            };
        }
        return {};
    }

    if (/[0-9]+/.test(buttonName)) {
        if (buttonName === '0' && state.next === '0') {
            return {};
        }

        if (state.operation) {
            if (state.next) {
                return { next: state.next + buttonName };
            }

            return { next: buttonName };
        }

        if (state.next) {
            const next: string = state.next === '0' ? buttonName : state.next + buttonName;

            return {
                next,
                total: null,
            };
        }

        return {
            next: buttonName,
            total: null,
        };
    }

    if (buttonName === 'sqrt') {
        if (state.next) {
            return {
                total: operate(0, state.next, 'sqrt'),
                next: null,
                operation: null,
            };
        }

        return {};
    }

    if (buttonName === 'percent') {
        if (state.operation && state.next) {
            if (state.total) {
                const result: BigSource = operate(state.total, state.next, state.operation);
                return {
                    total: Big(result).div(Big('100')).toString(),
                    next: null,
                    operation: null,
                };
            }
        }

        if (state.next) {
            return {
                next: Big(state.next).div(Big('100')).toString(),
            };
        }
        return {};
    }

    if (buttonName === '.') {
        if (state.next) {
            if (state.next.includes('.')) {
                return {};
            }
            return { next: state.next + '.' };
        }
        return { next: '0.' };
    }

    if (buttonName === 'equal') {
        if (state.next && state.operation && state.total) {
            return {
                total: operate(state.total, state.next, state.operation),
                next: null,
                operation: null,
            };
        } else {
            return {};
        }
    }

    if (buttonName === 'plusminus') {
        if (state.next) {
            return { next: (-1 * parseFloat(state.next)).toString() };
        }
        if (state.total) {
            return { total: (-1 * parseFloat(state.total)).toString() };
        }
        return {};
    }

    if (state.operation && state.total && state.next) {
        return {
            total: operate(state.total, state.next, state.operation),
            next: null,
            operation: buttonName,
        };
    }

    if (!state.next) {
        return { operation: buttonName };
    }

    return {
        total: state.next,
        next: null,
        operation: buttonName,
    };
}
