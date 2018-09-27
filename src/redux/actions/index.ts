import { modules }from "./modules";
import {createServiceAction} from "./actionCreators";

export enum ACTION_TYPES {
    GET= 'get',
    GET_ONE= 'getOne',
    REMOVE= 'remove',
    ADD= 'add',
    EDIT= 'edit',
}

export const actions = {
    ...modules,
    ...createServiceAction('TaskModule', [ACTION_TYPES.GET]),
};