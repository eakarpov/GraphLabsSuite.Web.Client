import Connector from "../lib/connector";
import {Validation} from "fp-ts/lib/Validation";
import {PageState} from "../app/containers/Page";

export interface AssetManifest {
    'main.css': string;
    'main.js': string;
    'index.html': string;
}

class Api {
    public getModules() {
        return Connector.get('odata/taskModules');
    }

    public getModuleManifest(id: number) {
        return Connector.get<AssetManifest>(this.url(id, 'asset-manifest.json'));
    }

    public getModuleCode(id: number, data: AssetManifest): Promise<Validation<string, string>> {
        return this.getModuleFile(id, 'main.js', data);
    }

    public getModuleStyle(id: number, data: AssetManifest): Promise<Validation<string, string>> {
        return this.getModuleFile(id, 'main.css', data);
    }

    public getModuleHtml(id: number, data: AssetManifest): Promise<Validation<string, string>> {
        return this.getModuleFile(id, 'index.html', data);
    }

    public getVariant(id: number): Promise<Validation<string, string>> {
        return Connector.fetch(`odata/taskModules(${id})/randomVariant`);
    }

    public uploadModule(id: string, archive: any) {
        return Connector.upload(`odata/taskModules(${id})/upload`, archive, 'application/zip');
    }

    public me(): Promise<Validation<string, any>>  {
        return Connector.fetch(`odata/currentUser`);
    }

    public getResults(state: PageState) {
        // $expand=student,variant($expand=taskModule)
        let url = `$expand=student,variant($expand=taskModule)&$top=${state.limit}&$skip=${(state.page - 1)*state.limit}`;
        if (Object.keys(state.filter).length > 0) {
            url += `&$filter=`;
            const arr: string[] = [];
            Object.keys(state.filter).forEach((key: string) => {
               arr.push(`contains(${key},'${state.filter[key]}') eq true`);
            });
            url += arr.join(' and ');
        }
        if (state.sort.header) {
            url += `&$orderby=${state.sort.query} ${state.sort.asc ? 'asc' : 'desc'}`;
        }
        url += '&$count=true';
        return Connector.get('odata/taskVariantLogs?' + url);
    }

    private getModuleFile(
        id: number,
        key: string,
        data: AssetManifest,
    ): Promise<Validation<string, string>> {
        return Connector.fetch(this.url(id, encodeURIComponent(data[key])));
    }

    private url = (ID: number, file: string) => `odata/taskModules(${ID})/download(path='${file}')`;
}

export default new Api();