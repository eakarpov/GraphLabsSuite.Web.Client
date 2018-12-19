import {createAction} from "typesafe-actions";

export const setLogged = '@APP/SET_LOGGED';

export const state = {
      setLogged: createAction(
          setLogged,
      resolve => (logged: boolean) => resolve(logged)),
};