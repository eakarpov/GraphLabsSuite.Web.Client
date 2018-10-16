import {combineReducers, Reducer} from "redux";
import {ModulesState, reducer as modules} from "./reducers/modules";
import {ModuleState, reducer as module} from "./reducers/module";

export interface RootState {
    modules: ModulesState;
    module: ModuleState;
}

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    // i18n: i18nReducer,
    modules,
    module,
});

export default rootReducer;