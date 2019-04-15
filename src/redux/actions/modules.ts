import {Dispatch} from "redux";
import {actions} from "./index";
import {Validation} from "fp-ts/lib/Validation";
import {ModuleData} from "../reducers/modules";
import api, {AssetManifest} from '../../api';

export const modules = {
    getModules: () => {
        return (dispatch: Dispatch) => {
            dispatch(actions['getTaskModulesAsyncStart']());
            api.getModules()
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
        api.getModuleManifest(id)
          .then(async (
              res: Validation<string, AssetManifest>
          ) => {
            const data = res.getOrElse({} as AssetManifest);
            const js = (await api.getModuleCode(id, data)).getOrElse("");
            const css = (await api.getModuleStyle(id, data)).getOrElse("");
            // const html = (await api.getModuleHtml(id, data)).getOrElse("");
            const variantData = await api.getVariant(id);
            const variantJSON = variantData.getOrElse("");
            sessionStorage.setItem('variant', variantJSON);
            if (data) {
              dispatch(actions['getTaskModuleAsyncSuccess']({
                  js,
                  css,
                  // html,
              }));
            } else {
              dispatch(actions['getTaskModuleAsyncFail']());
            }
          });
      }
    },
};