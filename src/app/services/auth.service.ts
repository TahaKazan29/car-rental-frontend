import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { PasswordChange } from '../models/passwordChange';
import { ResponseModel } from '../models/responseModel';
import { TokenModel } from '../models/tokenModel';
import { CustomerService } from './customer.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44318/api/auth/";
  jwtHelper:JwtHelperService = new JwtHelperService();
  decodedToken:any;
  role:string[] = [];

  constructor(private httpClient:HttpClient,
    private router:Router,
    private toastrService:ToastrService,
    private customerService:CustomerService,
    private userService:UserService)
    {
      if (this.isAuthenticated()) {
        this.getRole();
      }
    }

  login(loginModel:TokenModel)
  {
    let newPath = this.apiUrl + "login";
    return this.httpClient.post<ItemResponseModel<TokenModel>>(newPath,loginModel).subscribe(response => {
      this.decodedToken = this.jwtHelper.decodeToken(response.data.token.toString());
      this.router.navigate(["cars"]);
      this.toastrService.info(response.message);
      localStorage.setItem('token',response.data.token);
      this.getRole();
      this.customerService.getCustomerByUserId(this.getCurrentUser().nameid).subscribe(response => {
        if (response.data) {
          localStorage.setItem("customerId",response.data.id.toString())
        }
      })
    },responseError => {
      this.toastrService.info(responseError.error);
    })
  }

  register(registerModel:TokenModel):Observable<ItemResponseModel<TokenModel>>
  {
    let newPath = this.apiUrl + "register";
    return this.httpClient.post<ItemResponseModel<TokenModel>>(newPath,registerModel);
  }

  logOut()
  {
    localStorage.clear();
  }

  isAuthenticated()
  {
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }

  get token()
  {
    return localStorage.getItem('token');
  }

  getCurrentUser()
  {
    return this.jwtHelper.decodeToken(this.token!)
  }

  updatePassword(passwordChange:PasswordChange):Observable<ResponseModel>{
    let newPath = this.apiUrl + "changepassword"
    return this.httpClient.put<ResponseModel>(newPath,passwordChange)
  }

  getRole()
  {
    this.userService.getClaim(this.getCurrentUser().nameid).subscribe(response => {
      this.role = response.data.map(r => r.name);
    })
  }

  roleControl()
  {
      let role = this.role
      let lenght = role.length;
      for (let i = 0; i <= lenght; i++) {
        const element = role[i];
        if (element == 'admin' || element == 'car.update') {
          return true;
        }
        else {return false;}
      }
      return;
  }
}
