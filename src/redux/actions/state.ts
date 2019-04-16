import {createAction} from "typesafe-actions";
import {UserData} from "../../types/user";

export const setLogged = '@APP/SET_LOGGED';
export const setUserData = '@APP/SET_USER_DATA';

export const state = {
      setLogged: createAction(
          setLogged,
      resolve => (logged: boolean) => resolve(logged)),
      setUserData: createAction(
          setUserData,
          resolve => (userData: UserData) => resolve(userData),
      ),
};