import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

const baseUrl = `${environment.apiBaseUrl}/customers`

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAll(searchText=''): Observable<Customer[]> {
    let url = baseUrl
    if (searchText) {
      url = `${url}?filter=name:${searchText},email:${searchText}`
    }
    return this.http.get<Customer[]>(url)
  }

  get(id: any): Observable<Customer> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
