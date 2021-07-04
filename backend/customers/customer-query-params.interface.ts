import { QueryParams } from "../common/interfaces/query-params.interface";

export interface CustomerQueryParams extends QueryParams {
    sortBy?: string
    filterParams?: Array<string>
}
