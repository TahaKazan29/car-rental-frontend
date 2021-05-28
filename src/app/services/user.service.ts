import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { UserDetail } from '../models/userDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44318/api/users";

  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<ListResponseModel<UserDetail>> {
    return this.httpClient.get<ListResponseModel<UserDetail>>(this.apiUrl);
  }

  getUser(userId:number):Observable<ItemResponseModel<UserDetail>> {
    let newPath = this.apiUrl + "/getforuserdetail/" + userId;
    return this.httpClient.get<ItemResponseModel<UserDetail>>(newPath);
  }

  updateUserInfo(user:UserDetail):Observable<ResponseModel>{
    let newPath = this.apiUrl + "/updateuserinfo";
    return this.httpClient.put<ResponseModel>(newPath,user);
  }

  getClaim(userId:number):Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + "/getclaims/" + userId;
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }

}
