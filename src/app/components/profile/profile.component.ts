import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  user:UserDetail;
  userId:number;
  roles:OperationClaim[];
  isAdmin:boolean;
  constructor( private toastrService:ToastrService,
    private router:Router,
    private userService:UserService,
    public authService:AuthService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.getUser();
    this.getRole();
  }

  getUser()
  {
    this.userService.getUser(this.authService.getCurrentUser().nameid).subscribe(response => {
      this.user = response.data;
    })
  }

  getRole(){
    this.userService.getClaim(this.authService.getCurrentUser().nameid).subscribe(res => {
      this.roles = res.data;
      this.checkRoles();
    })
  }

  checkRoles(){
    var result = this.roles.find(r => r.name == "admin");
    if(result != null) {
     this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
  }


  isLogged()
  {
    return this.authService.isAuthenticated();
  }

  logOut()
  {
    this.router.navigate(['login']);
    this.toastrService.info("Çıkış Yapıldı");
    return this.authService.logOut();
  }

}
