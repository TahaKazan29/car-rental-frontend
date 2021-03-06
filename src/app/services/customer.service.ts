import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44318/api/customers/";

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }

  getCustomer(customerId:number):Observable<ItemResponseModel<Customer>> {
    let newPath = this.apiUrl + customerId;
    return this.httpClient.get<ItemResponseModel<Customer>>(newPath);
  }

  getCustomerByUserId(userId:number):Observable<ItemResponseModel<Customer>> {
    let newPath = this.apiUrl + "getbyuserid/" + userId;
    return this.httpClient.get<ItemResponseModel<Customer>>(newPath);
  }

  add(customer: Customer): Observable<ItemResponseModel<Customer>> {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ItemResponseModel<Customer>>(newPath,customer);
  }

}
