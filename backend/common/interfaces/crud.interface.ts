import { QueryParams } from "./query-params.interface";

export interface CRUD {
    getAll: (options: QueryParams) => Promise<QueryParams>
    create: (resource: any) => Promise<any>
    putById: (id: string, resource: any) => Promise<string>
    patchById: (id: string, resource: any) => Promise<string>
    getById: (id: string) => Promise<string>
    deleteById: (id: string) => Promise<string>
}
