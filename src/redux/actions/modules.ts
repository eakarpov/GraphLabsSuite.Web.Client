import {Dispatch} from "redux";
import Connector from '../../lib/connector';
// import {createAction} from "typesafe-actions";
import {actions} from "./index";

export const modules = {
    getModules: () => {
        return (dispatch: Dispatch) => {
            dispatch(actions['getTaskModulesAsyncStart']);
            // dispatch(modules.getModulesAsyncStart());
            Connector.get('odata/TaskModules')
                .then((res: any[]) => {
                    dispatch(actions['getTaskModulesAsyncSuccess']);
                    // dispatch(modules.getModulesAsyncSuccess(res))
                })
                .catch(() => {
                    // dispatch(modules.getModulesAsyncFail());
                    dispatch(actions['getTaskModulesAsyncFail']);
                });
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