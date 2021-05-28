import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  apiUrl = "https://localhost:44318/api/operationclaims";

  constructor(private http:HttpClient) { }

  getOperationClaims():Observable<ListResponseModel<OperationClaim>> {
    return this.http.get<ListResponseModel<OperationClaim>>(this.apiUrl);
  }

}
