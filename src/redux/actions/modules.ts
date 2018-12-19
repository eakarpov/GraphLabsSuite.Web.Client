import {Dispatch} from "redux";
import Connector from '../../lib/connector';
import {actions} from "./index";
import {Validation} from "fp-ts/lib/Validation";
import {ModuleData} from "../reducers/modules";

export const modules = {
    getModules: () => {
        return (dispatch: Dispatch) => {
            dispatch(actions['getTaskModulesAsyncStart']());
            Connector.get('odata/taskModules')
                .then((res: Validation<string, { value?: ModuleData[]}>) => {
                    const data = res.getOrElse({});
                    if (data.value) {
                        dispatch(actions['getTaskModulesAsyncSuccess']({ data: data.value }));
                    } else {
                        dispatch(actions['getTaskModulesAsyncFail']());
                    }
                });
        };
    },
    getModule: (id: number) => {
      return (dispatch: Dispatch) => {
        dispatch(actions['getTaskModuleAsyncStart']());
        const url = (ID: number, file: string) => `odata/taskModules(${ID})/download(path='${file}')`;
        Connector.get(url(id, 'asset-manifest.json'))
          .then(async (res: Validation<string, { value?: any }>) => {
            const data = res.getOrElse({});
            const js = (await Connector.fetch(url(id, encodeURIComponent(data['main.js']))) as Validation<string, { value?: any }>)
                .getOrElse({});
            const css = (await Connector.fetch(url(id, encodeURIComponent(data['main.css']))) as Validation<string, { value?: any }>)
                .getOrElse({});
            const variantData = (await Connector.fetch(`odata/taskModules(${id})/randomVariant`) as Validation<string, string>);
            const variantJSON = variantData.getOrElse("");
            sessionStorage.setItem('variant', variantJSON);
            if (data) {
              dispatch(actions['getTaskModuleAsyncSuccess']({
                  js,
                  css,
              }));
            } else {
              dispatch(actions['getTaskModuleAsyncFail']());
            }
          });
      }
    },
};