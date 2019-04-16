import {Reducer} from "redux";
import {createAsyncReducer} from "./asyncReducer";
import {actions} from "../actions";
import {IPageableState} from "../../types/redux";

export interface ResultData {
    id: number;
    action: string;
    variantId: number;
    studentId: number;
    dateTime: string;
    moduleId: number;
}

export interface ResultsState extends IPageableState<ResultData> {}

export const reducer: Reducer<ResultsState> = createAsyncReducer<ResultsState>({
    pending: actions['getTaskVariantLogsAsyncStart'],
    fail: actions['getTaskVariantLogsAsyncFail'],
    success: actions['getTaskVariantLogsAsyncSuccess'],
});