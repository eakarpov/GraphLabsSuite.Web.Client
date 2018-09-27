import {Action} from "redux";

export interface AsyncState<T = {}> {
    pending: boolean;
    error: boolean;
    data: T;
    initial: boolean;
}

export interface IPageableAsyncState<T = {}> {
    pending: boolean;
    error: boolean;
    initial: boolean;
}

export interface IPageableState<T> extends IPageableAsyncState<T> {
    data: T[];
    limit: number;
    total: number;
    skip: number;
}

export interface AppAction extends Action {
    payload?: any;
}

export interface VoidAction extends AppAction {
    type: string;
}

export interface GetPageAction extends AppAction {
    type: string;
    payload: any; // IQueryParamsEntry;
}

export interface GotPageAction<T> extends AppAction {
    type: string;
    payload: IPageableState<T>;
}

export interface EntityWithCallbackAction<T> extends AppAction {
    type: string;
    payload: {
        data: T;
        callback: (props: any) => PromiseLike<void>;
    };
}

export interface GetEntityAction extends AppAction {
    type: string;
    payload: number;
}

export interface GotEntityAction<T> extends AppAction {
    type: string;
    payload: AsyncState<T>;
}

export type RootAction =
    | AppAction
   // | ReactRouterAction;
