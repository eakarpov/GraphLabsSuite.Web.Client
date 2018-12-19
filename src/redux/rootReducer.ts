import {combineReducers, Reducer} from "redux";
import {ModulesState, reducer as modules} from "./reducers/modules";
import {ModuleState, reducer as module} from "./reducers/module";
import {AppState, reducer as state} from "./reducers/state";

export interface RootState {
    modules: ModulesState;
    module: ModuleState;
    state: AppState;
}

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    // i18n: i18nReducer,
    modules,
    module,
    state,
});

export default rootReducer;