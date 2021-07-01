import { QueryParams } from "./query-params.interface";

export interface CRUD {
    getAll: (options: any) => Promise<any>
    create: (resource: any) => Promise<any>
    putById: (id: string, resource: any) => Promise<string>
    patchById: (id: string, resource: any) => Promise<string>
    getById: (id: string) => Promise<any>
    deleteById: (id: string) => Promise<string>
}
