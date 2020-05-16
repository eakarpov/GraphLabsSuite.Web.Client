import {Reducer} from "redux";
import {createAsyncReducer} from "./asyncReducer";
import {actions} from "../actions";
import {IPageableState} from "../../types/redux";

export interface Subject {
    id: number;
    name: string;
    description: string;
}

//
// export interface Question {
//     id: number;
//     plain_text: string;
//     description: string;
// }


export interface TestState extends IPageableState<Subject> {}

export const reducer: Reducer<TestState> = createAsyncReducer<TestState>({
    pending: actions['getSubjectsAsyncStart'],
    fail: actions['getSubjectsAsyncFail'],
    success: actions['getSubjectsAsyncSuccess'],
});
