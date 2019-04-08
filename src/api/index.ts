import Connector from "../lib/connector";
import {Validation} from "fp-ts/lib/Validation";

class Api {
    public getModules() {
        return Connector.get('odata/taskModules');
    }

    public getModuleManifest(id: number) {
        return Connector.get(this.url(id, 'asset-manifest.json'));
    }

    public getModuleCode(id: number, data: { 'main.js': string }): Promise<Validation<string, string>> {
        return Connector.fetch(this.url(id, encodeURIComponent(data['main.js'])));
    }

    public getModuleStyle(id: number, data: { 'main.css': string }): Promise<Validation<string, string>> {
        return Connector.fetch(this.url(id, encodeURIComponent(data['main.css'])));
    }

    public getVariant(id: number): Promise<Validation<string, string>> {
        return Connector.fetch(`odata/taskModules(${id})/randomVariant`);
    }

    public uploadModule(archive: any) {
        return Connector.post(`odata/taskModules(1)/upload`, archive);
    }

    private url = (ID: number, file: string) => `odata/taskModules(${ID})/download(path='${file}')`;
}

export default new Api();