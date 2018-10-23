import * as React from 'react';
import {ReactNode, SFC} from 'react';

type ReactNodeFunc = () => ReactNode;

interface IState {
    initial: boolean;
    pending: boolean;
    error: any;
}

interface IAsyncWrapper {
    state: IState|IState[];
    children: ReactNode|ReactNodeFunc;
}

const AsyncWrapper: SFC<IAsyncWrapper> = ({ state, children }) => {
    const states: IState[] = Array.isArray(state) ? state : [state];
    if ((states).reduce((p, c ) => p || c.initial, false)) { return null; }
    if ((states).reduce((p, c ) => p || c.pending, false)) { return (
        <div className="loader-container">
            Загрузка...
        </div>);
    }
    if ((states).reduce((p, c ) => p || c.error, false)) {
        return <div>Ошибка загрузки данных</div>;
    }
    return <div>{typeof children === 'function' ? children() : children}</div>;
};

export default AsyncWrapper;
