export class Util {
    public static clean(obj: any) {
        const res = {};
        Object.keys(obj).forEach((key: string) => {
           if (obj[key]) {
               res[key] = obj[key];
           }
        });
        return res;
    }
}