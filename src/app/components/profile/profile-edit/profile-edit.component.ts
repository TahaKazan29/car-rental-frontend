import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { PasswordChange } from 'src/app/models/passwordChange';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user:UserDetail;
  change:any;
  passwordForm:FormGroup;

  constructor(private userService:UserService,
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.getUser();
    this.createPasswordForm();
  }

  createPasswordForm(){
    this.passwordForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
    })
  }

  display(change:any)
  {
    this.change = change;
  }

  getChange(change:any)
  {
    if(this.change === change)
    {
      return ""
    }
    else {
      return "change"
    }
  }

  getUser()
  {
    this.userService.getUser(this.authService.getCurrentUser().nameid).subscribe(response => {
      this.user = response.data;
    })
  }

  update(){
    this.userService.updateUserInfo(this.user).subscribe(response => {
      this.router.navigate(['cars']);
      this.toastrService.success("Güncelleme Başarılı","Başarılı");
    },responseError => {
      if (responseError.error.Errors.length > 0) {
              for(let i = 0; i < responseError.error.Errors.length; i++)
              {
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
              }
            }
    })
  }

  updatePassword()
  {
    if (this.passwordForm.valid) {
      let changePassword:PasswordChange = new PasswordChange();
      changePassword = Object.assign({},this.passwordForm.value);
      changePassword.userId = this.user.id;
      this.authService.updatePassword(changePassword).subscribe(response => {
        this.toastrService.info(response.message,"Başarılı");
        this.router.navigate(['/cars']);
      },err => {
        this.toastrService.info(err.error.message,"Hata");
      })
    }
    else
    {
      this.toastrService.error("Formunuz Eksik ya da Hatalı","Dikkat");
    }
  }

}
