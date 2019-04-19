import {Reducer} from "redux";
import {createAsyncReducer} from "./asyncReducer";
import {actions} from "../actions";
import {IPageableState} from "../../types/redux";
import {ModuleData} from "./modules";

export interface VariantData {
    id: number;
    name: string;
    variantData: string;
    taskModule: ModuleData;
}

export interface StudentData {
    email: string;
    fatherName: string;
    firstName: string;
    group: string;
    id: number;
    lastName: string;
}

export interface ResultData {
    id: number;
    action: string;
    variant: VariantData;
    student: StudentData;
    variantId: number;
    studentId: number;
    dateTime: string;
}

export interface ResultsState extends IPageableState<ResultData> {}

export const reducer: Reducer<ResultsState> = createAsyncReducer<ResultsState>({
    pending: actions['getTaskVariantLogsAsyncStart'],
    fail: actions['getTaskVariantLogsAsyncFail'],
    success: actions['getTaskVariantLogsAsyncSuccess'],
});