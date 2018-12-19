import {setLogged} from "../actions/state";
import {Reducer} from "redux";

export interface AppState {
    logged: boolean;
}

export const reducer:  Reducer<AppState> = (state: AppState = { logged: false }, action: any) => {
    switch (action.type) {
        case setLogged: {
            return {
                ...state,
                logged: action.payload,
            };
        }
        default: return state;
    }
};
