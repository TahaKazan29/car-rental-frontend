import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  apiUrl = "https://localhost:44318/api/";

constructor(private httpClient: HttpClient) { }

  addBank(bank:Bank):Observable<ItemResponseModel<Bank>> {
    let newPath = this.apiUrl + "banks/add";
    return this.httpClient.post<ItemResponseModel<Bank>>(newPath,bank);
  }

}
