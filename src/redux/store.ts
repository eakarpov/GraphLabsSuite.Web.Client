import { createStore, applyMiddleware, Middleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, {RootState} from './rootReducer';
import {getInitialArray, getInitialObject} from "./reducers/asyncReducer";
import {ModuleData} from "./reducers/modules";
import {ResultData} from "./reducers/results";
import {VariantsData} from "./reducers/variants";

const initial = {
  modules: getInitialArray<ModuleData>(),
  module: getInitialObject<any>(),
  state: { logged: false },
  me: getInitialObject<any>(),
  results: getInitialArray<ResultData>(),
  variants: getInitialArray<VariantsData>()
};

export function configureStore(initialState: RootState): Store<RootState> {
    const middlewares: Middleware[] = [
        thunk,
    ];
    let stateStore: Store<RootState>;
    if (process.env.NODE_ENV === 'production') {
        stateStore = createStore(rootReducer, initialState, applyMiddleware(...middlewares));
    } else {
        stateStore = createStore(rootReducer, initialState, composeWithDevTools(
            applyMiddleware(...middlewares),
        ));
    }

    if ((module as any).hot) {
        // Enable Webpack hot module replacement for reducers
        (module as any).hot.accept([], () => {
            stateStore.replaceReducer(rootReducer);
        });
    }
    return stateStore;
}

export const store = configureStore(initial);