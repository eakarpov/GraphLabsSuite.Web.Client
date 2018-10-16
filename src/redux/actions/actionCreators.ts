import {createAction} from 'typesafe-actions';
import {AppAction} from '../../types/redux';
import {ACTION_TYPES} from './index';
import {QueryParamsEntry} from "../../types/QueryParamsEntry";

export function createServiceAction(serviceName: string, actions: string[]): {[key: string]: AppAction}  {
    const resActions: any = {};
    const entity = `${serviceName}s`;
    actions.forEach(act => {
        switch (act) {
            case ACTION_TYPES.GET_ONE: {
                resActions[`get${serviceName}`] = createAction(
                    `${serviceName.toUpperCase()}_GET`,
                    resolve => (id: number) => resolve(id));
                resActions[`get${serviceName}AsyncStart`] = createAction(
                    `${serviceName.toUpperCase()}_GET_ASYNC_START`);
                resActions[`get${serviceName}AsyncSuccess`] = createAction(
                    `${serviceName.toUpperCase()}_GET_ASYNC_SUCCESS`,
                    resolve => (subject: any) => resolve(subject));
                resActions[`get${serviceName}AsyncFail`] = createAction(
                    `${serviceName.toUpperCase()}_GET_ASYNC_FAIL`);
                break;
            }
            case ACTION_TYPES.GET: {
                resActions[`get${entity}`] = createAction(`${entity.toUpperCase()}_GET`,
                    resolve => (params: QueryParamsEntry) => resolve(params));
                resActions[`get${entity}AsyncStart`] = createAction(
                    `${entity.toUpperCase()}_GET_ASYNC_START`);
                resActions[`get${entity}AsyncFail`] = createAction(
                    `${entity.toUpperCase()}_GET_ASYNC_FAIL`);
                resActions[`get${entity}AsyncSuccess`] = createAction(
                    `${entity.toUpperCase()}_GET_ASYNC_SUCCESS`,
                    resolve => (subject: any) => resolve(subject));
                break;
            }
            case ACTION_TYPES.ADD: {
                resActions[`add${serviceName}`] = createAction(
                    `${entity.toUpperCase()}_ADD`,
                    resolve => (subject: any, callback: (props: any) => void, hookData?: any) => resolve({
                            data: subject,
                            callback,
                            hookData,
                        }));
                resActions[`add${serviceName}AsyncStart`] = createAction(
                    `${entity.toUpperCase()}_ADD_ASYNC_START`);
                resActions[`add${serviceName}AsyncSuccess`] = createAction(
                    `${entity.toUpperCase()}_ADD_ASYNC_SUCCESS`,
                    resolve => (subject: any) => resolve(subject));
                resActions[`add${serviceName}AsyncFail`] = createAction(
                    `${entity.toUpperCase()}_ADD_ASYNC_FAIL`);
                break;
            }
            case ACTION_TYPES.EDIT: {
                resActions[`edit${serviceName}`] = createAction(
                    `${serviceName.toUpperCase()}_EDIT`,
                    resolve => (id: number, data: any, callback: (props: any) => void, hookData?: any) =>
                        resolve({
                                id,
                                data,
                                callback,
                                hookData,
                            }));
                resActions[`edit${serviceName}AsyncStart`] = createAction(
                    `${entity.toUpperCase()}_EDIT_ASYNC_START`);
                resActions[`edit${serviceName}AsyncSuccess`] = createAction(
                    `${entity.toUpperCase()}_EDIT_ASYNC_SUCCESS`,
                    resolve => (subject: any) => resolve(subject));
                resActions[`edit${serviceName}AsyncFail`] = createAction(
                    `${entity.toUpperCase()}_EDIT_ASYNC_FAIL`);
                break;
            }
            case ACTION_TYPES.REMOVE: {
                resActions[`delete${serviceName}`] = createAction(
                    `${entity.toUpperCase()}_DELETE`,
                    resolve => (id: number, callback: (props: any) => PromiseLike<any>, hookData?: any) =>
                        resolve({
                            data: id,
                            callback,
                            hookData,
                        }));
                resActions[`delete${serviceName}AsyncStart`] = createAction(
                    `${entity.toUpperCase()}_DELETE_ASYNC_START`);
                resActions[`delete${serviceName}AsyncSuccess`] = createAction(
                    `${entity.toUpperCase()}_DELETE_ASYNC_SUCCESS`,
                    resolve => (subject: any) => resolve(subject));
                resActions[`delete${serviceName}AsyncFail`] = createAction(
                    `${entity.toUpperCase()}_DELETE_ASYNC_FAIL`);
                break;
            }
            default: break;
        }
    });
    return resActions;
}
