import {Reducer} from "redux";
import {createAsyncReducer} from "./asyncReducer";
import {actions} from "../actions";
import {AsyncState} from "../../types/redux";

export interface MyState extends AsyncState<any> {}

export const reducer: Reducer<MyState> = createAsyncReducer<MyState>({
    pending: actions['getMeAsyncStart'],
    fail: actions['getMeAsyncFail'],
    success: actions['getMeAsyncSuccess'],
});