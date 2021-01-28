type StateValueType = string | null;

export interface ICalcState {
    total?: StateValueType;
    next?: StateValueType;
    operation?: StateValueType;
}

export interface IButton {
    name: string;
    title: string;
    wide?: boolean;
    primary?: boolean;
    clickHandler?: (buttonName: string) => void;
}
