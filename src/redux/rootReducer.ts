import {combineReducers, Reducer} from "redux";
import {ModulesState, reducer as modules} from "./reducers/modules";
import {ModuleState, reducer as module} from "./reducers/module";
import {AppState, reducer as state} from "./reducers/state";
import {reducer as results, ResultsState} from "./reducers/results";
import {MyState, reducer as me} from './reducers/me';
import {TestState, reducer as test} from "./reducers/test";

export interface RootState {
    test: TestState;
    modules: ModulesState;
    module: ModuleState;
    state: AppState;
    results: ResultsState;
    me: MyState;
}

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    // i18n: i18nReducer,
    me,
    test,
    modules,
    module,
    results,
    state,
});

export default rootReducer;
