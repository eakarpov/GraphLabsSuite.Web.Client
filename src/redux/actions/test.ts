import {Dispatch} from 'redux';
import {actions} from './index';
import {Validation} from 'fp-ts/lib/Validation';
import api from '../../api';
import {Subject} from "../reducers/test";

export const test = {
    getSubjects: () => {
      return (dispatch: Dispatch) => {
        dispatch(actions['getSubjectsAsyncStart']());
        api.getSubjects().then(
          (res: Validation<string, { value?: Subject[] }>) => {
            const data = res.getOrElse({});
            if (data.value){
              dispatch(actions['getSubjectsAsyncSuccess']({
                data: data.value
              }));
            }else{
              dispatch(actions['getSubjectsAsyncFail']());
            }
          }
        );
      }
    }
};
