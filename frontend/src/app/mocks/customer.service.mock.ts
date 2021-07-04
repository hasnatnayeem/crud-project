import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceMock {

  constructor() { }

  getAll(searchText=''): Observable<Customer[]> {
    let customers = [
        {
            name: 'customer1',
            email: 'customer1@email.com'
        },
        {
            name: 'customer2',
            email: 'customer2@email.com'
        }
    ]
    return of(customers)
  }

//   get(id: any): Observable<Customer> {
//     return this.http.get(`${baseUrl}/${id}`);
//   }

//   create(data: any): Observable<any> {
//     return this.http.post(baseUrl, data);
//   }

//   update(id: any, data: any): Observable<any> {
//     return this.http.put(`${baseUrl}/${id}`, data);
//   }

//   delete(id: any): Observable<any> {
//     return this.http.delete(`${baseUrl}/${id}`);
//   }
}
