import {Dispatch} from 'redux';
import {actions} from './index';
import {Validation} from 'fp-ts/lib/Validation';
import api from '../../api';
import {ResultData} from "../reducers/results";
import {PageState} from "../../app/containers/Page";

export const results = {
    getResults: (state: PageState) => {
        return (dispatch: Dispatch) => {
            dispatch(actions['getTaskVariantLogsAsyncStart']());
            api.getResults(state)
                .then((res: Validation<string, { value?: ResultData[], '@odata.count'?: number }> ) => {
                    const data = res.getOrElse({});
                    if (data.value) {
                        dispatch(actions['getTaskVariantLogsAsyncSuccess']({
                            data: data.value,
                            total: data["@odata.count"],
                            limit: state.limit,
                            skip: state.skip,
                        }));
                    } else {
                        dispatch(actions['getTaskVariantLogsAsyncFail']());
                    }
                });
        };
    },
};