import {Reducer} from "redux";
import {createAsyncReducer} from "./asyncReducer";
import {actions} from "../actions";
import {AsyncState} from "../../types/redux";

export interface ModuleState extends AsyncState<any> {}

export const reducer: Reducer<ModuleState> = createAsyncReducer<ModuleState>({
  pending: actions['getTaskModuleAsyncStart'],
  fail: actions['getTaskModuleAsyncFail'],
  success: actions['getTaskModuleAsyncSuccess'],
});