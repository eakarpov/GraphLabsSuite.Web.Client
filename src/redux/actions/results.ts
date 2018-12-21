import {Dispatch} from "redux";
import Connector from '../../lib/connector';
import {actions} from "./index";
import {Validation} from "fp-ts/lib/Validation";
import {ModuleData} from "../reducers/modules";

export const results = {
    getResults: () => {
        return (dispatch: Dispatch) => {
            dispatch(actions['getTaskVariantLogsAsyncStart']());
            Connector.get('odata/taskVariantLogs')
                .then((res: Validation<string, { value?: ModuleData[]}>) => {
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