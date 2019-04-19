import {Dispatch} from 'redux';
import {actions} from './index';
import {Validation} from 'fp-ts/lib/Validation';
import api from '../../api';
import {ResultData} from "../reducers/results";

export const results = {
    getResults: () => {
        return (dispatch: Dispatch) => {
            dispatch(actions['getTaskVariantLogsAsyncStart']());
            api.getResults()
                .then((res: Validation<string, { value?: ResultData[]}>) => {
                    const data = res.getOrElse({});
                    if (data.value) {
                        dispatch(actions['getTaskVariantLogsAsyncSuccess']({ data: data.value }));
                    } else {
                        dispatch(actions['getTaskVariantLogsAsyncFail']());
                    }
                });
        };
    },
};