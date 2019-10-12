import {Dispatch} from "redux";
import {actions} from "./index";
import api from "../../api";


export const variants = {
    getVariants: () => {
        return (dispatch: Dispatch) => {
            dispatch(actions['getVariantListAsyncStart']());
            api.getVariantList()
                .then((res) => {
                    const data = res.getOrElse({value: []});
                    if (data.value) {
                        dispatch(actions['getVariantListAsyncSuccess']({ data: data.value }));
                    } else {
                        dispatch(actions['getVariantListAsyncFail']());
                    }
                })
                .catch(() => {
                    dispatch(actions['getVariantListAsyncFail']());
                });
        };
    }
};