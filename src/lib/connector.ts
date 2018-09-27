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
      public static get(url: string) {
          return fetch(Connector.makeUrl(url)).then(res => res.json());
      }
};