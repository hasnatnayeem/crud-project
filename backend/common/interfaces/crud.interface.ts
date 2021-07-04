import { QueryParams } from "./query-params.interface";

export interface CRUD {
    getAll: (options: QueryParams) => Promise<QueryParams>
    create: (resource: unknown) => Promise<unknown>
    putById: (id: string, resource: unknown) => Promise<string>
    patchById: (id: string, resource: unknown) => Promise<string>
    getById: (id: string) => Promise<unknown>
    deleteById: (id: string) => Promise<string>
}
