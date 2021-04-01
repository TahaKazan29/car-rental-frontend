import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { RegisteredCreditCard } from '../models/registeredCreditCard';

@Injectable({
  providedIn: 'root'
})
export class RegisteredCreditCardService {

  apiUrl = "https://localhost:44318/api/registeredCreditCards";

  constructor(private httpClient:HttpClient) { }

  getCustomersByRegisteredCreditCard():Observable<ListResponseModel<RegisteredCreditCard>> {
    return this.httpClient.get<ListResponseModel<RegisteredCreditCard>>(this.apiUrl);
  }

  getCustomerByRegisteredCreditCard(customerId:number):Observable<ListResponseModel<RegisteredCreditCard>> {
    let newPath = this.apiUrl +"/"+customerId;
    return this.httpClient.get<ListResponseModel<RegisteredCreditCard>>(newPath);
  }

  add(registeredCreditCard: RegisteredCreditCard): Observable<ItemResponseModel<RegisteredCreditCard>> {
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ItemResponseModel<RegisteredCreditCard>>(newPath,registeredCreditCard);
  }

  delete(registeredCreditCard: RegisteredCreditCard): Observable<ItemResponseModel<RegisteredCreditCard>> {
    let newPath = this.apiUrl + "/delete";
    return this.httpClient.post<ItemResponseModel<RegisteredCreditCard>>(newPath,registeredCreditCard);
  }


  }
