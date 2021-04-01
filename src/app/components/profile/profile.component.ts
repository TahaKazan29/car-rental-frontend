import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnChanges {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  user:UserDetail;
  userId:number;
  constructor( private toastrService:ToastrService,
    private router:Router,
    private userService:UserService,
    public authService:AuthService,
    public dialog: MatDialog) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.getUser();

  }

  ngOnInit(): void {
  }

  getUser()
  {
    this.userService.getUser(this.authService.getCurrentUser().nameid).subscribe(response => {
      this.user = response.data;
    })
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
