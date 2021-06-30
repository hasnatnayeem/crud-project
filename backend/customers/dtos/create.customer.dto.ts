export interface CreateCustomerDto {
    name: string
    email: string
    phone: string
    address?: string
    city?: string
    zipCode?: string
}