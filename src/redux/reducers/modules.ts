import {Reducer} from "redux";
import {createAsyncReducer} from "./asyncReducer";
import {actions} from "../actions";
import {IPageableState} from "../../types/redux";
//
// export default function (state: Store, action: any) {
//     switch (action.type) {
//         case 'SET_MODULES': {
//             return action.payload;
//         }
//         default: return state;
//     }
// }

export interface ModuleData {
    id: number;
    name: string;
    description: string;
    version: string;
}

export interface ModulesState extends IPageableState<ModuleData> {}

export const reducer: Reducer<ModulesState> = createAsyncReducer<ModulesState>({
    pending: actions['getTaskModulesAsyncStart'],
    fail: actions['getTaskModulesAsyncFail'],
    success: actions['getTaskModulesAsyncSuccess'],
});