import {Dispatch} from 'redux';
import {actions} from './index';
import {Validation} from 'fp-ts/lib/Validation';
import api from '../../api';

export const user = {
    getMeAsync: () => {
        return (dispatch: Dispatch) => {
            dispatch(actions['getMeAsyncStart']());
            api.me()
                .then((res: Validation<string, { value?: any}>) => {
                    if (res.isFailure()) {
                        dispatch(actions.setLogged(false));
                    } else {
                        const data = res.getOrElse({});
                        if (data.value) {
                            dispatch(actions['getMeAsyncSuccess']({data: data.value}));
                        } else {
                            dispatch(actions['getMeAsyncFail']());
                        }
                    }
                });
        };
    },
};