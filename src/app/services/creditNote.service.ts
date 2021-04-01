import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditNote } from '../models/creditNote';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {

  apiUrl = "https://localhost:44318/api/creditNotes/";

  constructor(private httpClient:HttpClient) { }

  add(creditNote: CreditNote): Observable<ItemResponseModel<CreditNote>> {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ItemResponseModel<CreditNote>>(newPath,creditNote);
  }

}
