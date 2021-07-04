import { PutCustomerDto } from './put.customer.dto';

// export interface PatchCustomerDto extends Partial<PutCustomerDto> {}
export type PatchCustomerDto = Array<PutCustomerDto>
