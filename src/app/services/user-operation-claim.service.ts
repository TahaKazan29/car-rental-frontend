import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { UserOpertaionClaim } from '../models/userOperationClaim';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  apiUrl = "https://localhost:44318/api/useroperationclaims/";

  constructor(private http:HttpClient) { }

  add(userOperationClaim:UserOpertaionClaim):Observable<ItemResponseModel<UserOpertaionClaim>>{
    let newPath = this.apiUrl + "add";
    return this.http.post<ItemResponseModel<UserOpertaionClaim>>(newPath,userOperationClaim);
  }
}
