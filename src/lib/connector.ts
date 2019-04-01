import {failure, success, Validation} from "fp-ts/lib/Validation";

let config: any;

export function init(conf?: any) {
    if (!config) {
        config = conf;
    }
    return config;
}

export default class Connector {
    public static makeUrl(url: string) {
        return `${init().hostBase}${url}`;
    }
      public static async get<T = { value?: any }>(url: string): Promise<Validation<string, T>> {
        try {
            const res = await fetch(Connector.makeUrl(url), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('gl-token')}`,
                },
            });
            return success<string, T>(await res.json());
        } catch(e) {
            return failure(e);
        }
      }
    public static async fetch(url: string): Promise<Validation<string, string>> {
        try {
            const res = await fetch(Connector.makeUrl(url), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('gl-token')}`,
                },
            });
            return success<string, string>(await res.text());
        } catch(e) {
            return failure(e);
        }
    }
    public static async login(url: string, body: any) {
        try {
            const res = await fetch(Connector.makeUrl(url), {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 400) {
                return failure('Not authenticated!');
            }
            return success(await res.json());
        } catch(e) {
            return failure(e);
        }
    }
    public static async post(url: string, body: any) {
        try {
            const res = await fetch(Connector.makeUrl(url), {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('gl-token')}`,
                  'Content-Type': 'application/json',
                },
            });
            return success(await res.text());
        } catch(e) {
            return failure(e);
        }
    }
};
