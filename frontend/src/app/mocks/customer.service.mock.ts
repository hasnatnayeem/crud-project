import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceMock {

  constructor() { }

  getAll(searchText=''): Array<{}> {
    return [
        {
            name: 'user1',
            email: 'user@email.com'
        }
    ];
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
