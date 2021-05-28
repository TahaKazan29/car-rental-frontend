import { Injectable } from '@angular/core';
import { OperationClaim } from '../models/operationClaim';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimControlService {

  apiUrl = "https://localhost:44318/api/users/";
  claim:OperationClaim[];

  constructor(private userService:UserService,private authService:AuthService)
   {
     if(this.authService.isAuthenticated()){
        this.userService.getClaim(this.authService.getCurrentUser().nameid).subscribe(res => {
          this.claim = res.data;
        })
     }
   }

  checkRoleCarAdd(){
    return this.claim?.find(c => c.name == "car.add" || c.name == "admin") ? true : false;
  }

  checkRoleCarUpdate(){
    return this.claim?.find(c => c.name == "car.update" || c.name == "admin") ? true : false;
  }

  checkRoleCarDelete(){
    return this.claim?.find(c => c.name == "car.delete" || c.name == "admin") ? true : false;
  }

  checkRoleBrandAdd(){
    return this.claim?.find(c => c.name == "brand.add" || c.name == "admin") ? true : false;
  }

  checkRoleBrandUpdate(){
    return this.claim?.find(c => c.name == "brand.update" || c.name == "admin") ? true : false;
  }

  checkRoleBrandDelete(){
    return this.claim?.find(c => c.name == "brand.delete" || c.name == "admin") ? true : false;
  }

  checkRoleColorAdd(){
    return this.claim?.find(c => c.name == "color.add" || c.name == "admin") ? true : false;
  }

  checkRoleColorUpdate(){
    return this.claim?.find(c => c.name == "color.update" || c.name == "admin") ? true : false;
  }

  checkRoleColorDelete(){
    return this.claim?.find(c => c.name == "color.delete" || c.name == "admin") ? true : false;
  }

  checkRolePlay(){
    return this.claim?.find(c => c.name == "admin") ? true : false;
  }

}
