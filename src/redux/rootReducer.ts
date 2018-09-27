import {combineReducers, Reducer} from "redux";
import {ModulesState, reducer as modules} from "./reducers/modules";

export interface RootState {
    modules: ModulesState;
}

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    // i18n: i18nReducer,
    modules,
});

export default rootReducer;