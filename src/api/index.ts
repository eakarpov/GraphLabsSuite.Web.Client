import Connector from "../lib/connector";
import {Validation} from "fp-ts/lib/Validation";

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

    public getResults(filter?: any) {
        // $expand=student,variant($expand=taskModule)
        let url = '$expand=student,variant($expand=taskModule)';
        if (filter) {
            Object.keys(filter).forEach((key: string) => {
                url += ` and $filter=substringof('${key}', ${filter[key]}) eq true`;
            });
        }
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