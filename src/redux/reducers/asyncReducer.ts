import {Reducer} from 'redux';
import {AppAction, AsyncState, IPageableState} from '../../types/redux';
import {getType} from 'typesafe-actions';

export interface AsyncReducer<T> {
    pending: (props: any) => any;
    fail: (props: any) => any;
    success: (props: any) => any;
    sync?: Reducer<T>;
}

export function getInitialObject<T>() {
    const defaultData =  {
            data: {} as T,
        };

    return {
        initial: true,
        pending: false,
        error: false,
        ...defaultData,
    };
}

export function getInitialArray<T>() {
    const defaultData =  {
        data: [] as T[],
        total: 0,
        skip: 0,
        limit: 0,
    };

    return {
        initial: true,
        pending: false,
        error: false,
        ...defaultData,
    };
}

export function createAsyncReducer<T extends IPageableState<any> | AsyncState>(
    args: AsyncReducer<T>, object?: boolean
): Reducer<T> {

    const defaultData = object
        ? {data: {}}
        : {
            data: [],
            total: 0,
            skip: 0,
            limit: 0,
        };

    const initialState: T = {
        initial: true,
        pending: false,
        error: false,
        ...defaultData,
    } as T;

    const pendingData: T = {
        initial: false,
        pending: true,
        error: false,
        ...defaultData,
    } as T;

    const errorData: T = {
        initial: false,
        pending: false,
        error: true,
        ...defaultData,
    } as T;

    return (state: T = initialState, action: AppAction): T => {
        switch (action.type) {
            case getType(args.pending): return pendingData;
            case getType(args.fail): return errorData;
            case getType(args.success): {
                return action.payload ? action.payload.data && Array.isArray(action.payload.data) ? {
                        initial: false,
                        pending: false,
                        error: false,
                        ...action.payload,
                    } as T
                    : {
                        initial: false,
                        pending: false,
                        error: false,
                        data: action.payload,
                    } as T
                    : initialState;
            }
            default: return args.sync ? args.sync(state, action) : state;
        }
    };
}
