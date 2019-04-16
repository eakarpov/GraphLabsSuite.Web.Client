import {setLogged, setUserData} from "../actions/state";
import {Reducer} from "redux";
import {UserData} from "../../types/user";

export interface AppState {
    logged: boolean;
    userData?: UserData;
}

export const reducer:  Reducer<AppState> = (state: AppState = { logged: false }, action: any) => {
    switch (action.type) {
        case setLogged: {
            return {
                ...state,
                logged: action.payload,
            };
        }
        case setUserData: {
            return {
                ...state,
                userData: action.payload,
            };
        }
        default: return state;
    }
};
