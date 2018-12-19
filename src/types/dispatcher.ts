export interface IQueryParamsEntry {
    limit?: number;
    page?: number;
    $sort?: any;
    $select?: any;
    $filter?: any;
}

export interface Interface {
    a: Array<{
        Action: string;
        VariantId: number;
    }>;
}