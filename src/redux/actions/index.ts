import { modules }from "./modules";
import { state } from './state';
import {createServiceAction} from "./actionCreators";
import {results} from "./results";
import {user} from './user';
import {test} from './test';

export enum ACTION_TYPES {
    GET= 'get',
    GET_ONE= 'getOne',
    REMOVE= 'remove',
    ADD= 'add',
    EDIT= 'edit',
}

export const actions = {
    ...test,
    ...modules,
    ...state,
    ...results,
    ...user,
    ...createServiceAction('Subject', [ACTION_TYPES.GET]),
    ...createServiceAction('TaskModule', [ACTION_TYPES.GET, ACTION_TYPES.GET_ONE]),
    ...createServiceAction('TaskVariantLog', [ACTION_TYPES.GET]),
    ...createServiceAction('Me', [ACTION_TYPES.GET_ONE]),
};
