import { QueryParams } from "../common/interfaces/query-params.interface";
import { CustomersFilterByEnum } from "./enums/customers-filter.enum";
import { CustomersSortByEnum } from "./enums/customers-sort-by.enum";

export interface CustomerQueryParams extends QueryParams {
    sortBy: CustomersSortByEnum
    filter: CustomersFilterByEnum
}
