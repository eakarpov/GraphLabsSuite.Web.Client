import {Dispatch} from "redux";
import Connector from '../../lib/connector';
import {actions} from "./index";
import {Validation} from "fp-ts/lib/Validation";
import {ModuleData} from "../reducers/modules";

export const modules = {
    getModules: () => {
        return (dispatch: Dispatch) => {
            dispatch(actions['getTaskModulesAsyncStart']());
            // dispatch(modules.getModulesAsyncStart());
            //tslint:disable
            console.log('asdasda');
            Connector.get('odata/TaskModules')
                .then((res: Validation<string, { value?: ModuleData[]}>) => {
                    const data = res.getOrElse({});
                    if (data.value) {
                        dispatch(actions['getTaskModulesAsyncSuccess']({ data: data.value }));
                    } else {
                        dispatch(actions['getTaskModulesAsyncFail']());
                    }
                    // dispatch(modules.getModulesAsyncSuccess(res))
                });
                // dispatch(modules.getModulesAsyncFail());
        };
    },
    getModule: (id: number) => {
      return (dispatch: Dispatch) => {
        dispatch(actions['getTaskModuleAsyncStart']());
        Connector.get(`odata/TaskModules(${id})/GraphLabs.Download(path='service-worker.js')`)
          .then((res: Validation<string, { value?: any }>) => {
            const data = res.getOrElse({});
            if (data) {
              dispatch(actions['getTaskModuleAsyncSuccess']({ data: data.value }));
            } else {
              dispatch(actions['getTaskModuleAsyncFail']());
            }
          });
      }
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