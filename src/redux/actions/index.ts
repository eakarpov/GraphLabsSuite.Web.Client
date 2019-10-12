import { modules }from "./modules";
import { state } from './state';
import {createServiceAction} from "./actionCreators";
import {results} from "./results";
import {user} from './user';
import {variants} from "./variants";

export enum ACTION_TYPES {
    GET= 'get',
    GET_ONE= 'getOne',
    REMOVE= 'remove',
    ADD= 'add',
    EDIT= 'edit',
}

export const actions = {
    ...modules,
    ...variants,
    ...state,
    ...results,
    ...user,
    ...createServiceAction('VariantList', [ACTION_TYPES.GET_ONE]),
    ...createServiceAction('TaskModule', [ACTION_TYPES.GET, ACTION_TYPES.GET_ONE]),
    ...createServiceAction('TaskVariantLog', [ACTION_TYPES.GET]),
    ...createServiceAction('Me', [ACTION_TYPES.GET_ONE]),
};