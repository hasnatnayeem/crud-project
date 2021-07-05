// Used for processing query params that comes with getAll request
// It will allow pagination, sorting and filtering

export interface QueryParams {
    limit?: number
    page?: number
    sortBy?: string
    filterParams?: Array<string>
}
