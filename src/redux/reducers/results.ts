import {Reducer} from "redux";
import {createAsyncReducer} from "./asyncReducer";
import {actions} from "../actions";
import {IPageableState} from "../../types/redux";

export interface ResultData {
    id: number;
    name: string;
    description: string;
    version: string;
}

export interface ResultsState extends IPageableState<ResultData> {}

export const reducer: Reducer<ResultsState> = createAsyncReducer<ResultsState>({
    pending: actions['getResultsAsyncStart'],
    fail: actions['getResultsAsyncFail'],
    success: actions['getResultsAsyncSuccess'],
});