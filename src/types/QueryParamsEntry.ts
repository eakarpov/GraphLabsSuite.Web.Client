import {IQueryParamsEntry} from "./dispatcher";

export class QueryParamsEntry {
    public limit?: number;
    public page?: number;
    public $sort?: any;
    public $select?: string[];
    public $filter?: any;
    public util: any;

    constructor(params?: IQueryParamsEntry) {
        if (params !== void 0) {
            this.limit = params.limit;
            this.page = params.page;
            this.$filter = params.$filter;
            this.$sort = params.$sort;
            this.$select = params.$select;
            this.util = {...params};
        }
    }
}
