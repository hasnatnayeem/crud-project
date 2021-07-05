import { QueryParams } from "./query-params.interface";

// common interface for CRUD it so that those remain in consistent structure

export interface CRUD {
    getAll: (options: QueryParams) => Promise<QueryParams>
    create: (resource: any) => Promise<any>
    putById: (id: string, resource: any) => Promise<string>
    patchById: (id: string, resource: any) => Promise<string>
    getById: (id: string) => Promise<string>
    deleteById: (id: string) => Promise<string>
}
