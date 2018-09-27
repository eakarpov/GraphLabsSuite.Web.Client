import {Dispatch} from "redux";
import Connector from '../../lib/connector';
// import {createAction} from "typesafe-actions";
import {actions} from "./index";
import {Validation} from "../../../node_modules/fp-ts/lib/Validation";

export const modules = {
    getModules: () => {
        return (dispatch: Dispatch) => {
            dispatch(actions['getTaskModulesAsyncStart']());
            // dispatch(modules.getModulesAsyncStart());
            Connector.get('odata/TaskModules')
                .then((res: Validation<any, string>) => {
                    const data = res.getOrElse("");
                    if (data) {
                        dispatch(actions['getTaskModulesAsyncSuccess'](data));
                    } else {
                        dispatch(actions['getTaskModulesAsyncFail']());
                    }
                    // dispatch(modules.getModulesAsyncSuccess(res))
                })
                // dispatch(modules.getModulesAsyncFail());
        };
    },
    // setModules: (modules: any[]) => ({
    //     type: 'SET_MODULES',
    //     payload: modules,
    // }),
    // getModulesAsyncStart: createAction('GET_MODULES_ASYNC_START'),
    // getModulesAsyncFail: createAction('GET_MODULES_ASYNC_FAIL'),
    // getModulesAsyncSuccess: createAction('GET_MODULES_ASYNC_SUCCESS',
    //     resolve => (res: any[]) => resolve({
    //     payload: res,
    // })),
};