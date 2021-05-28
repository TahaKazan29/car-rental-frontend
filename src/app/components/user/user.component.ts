import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserDetail } from 'src/app/models/userDetail';
import { UserOpertaionClaim } from 'src/app/models/userOperationClaim';
import { AuthService } from 'src/app/services/auth.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:UserDetail[] = [];
  operationClaims:OperationClaim[] = [];
  operationAddForm:FormGroup;

  constructor(private userService:UserService,private operationClaimService:OperationClaimService,
    private userOperationClaimService:UserOperationClaimService,
    private toastrService:ToastrService,
    private authService:AuthService,
    private FormBuilder:FormBuilder ) { }

  ngOnInit(): void {
    this.operationClaimAddForm();
    this.getUsers();
    this.getOperationClaims();
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res.data.filter(u => u.id != this.authService.getCurrentUser().nameid)
    })
  }

  getOperationClaims(){
    this.operationClaimService.getOperationClaims().subscribe(res => {
      this.operationClaims = res.data;
    })
  }

  operationClaimAddForm()
  {
    this.operationAddForm = this.FormBuilder.group({
      operationClaimId: ["",Validators.required]
    })
  }

  operationClaimAdd(userId:number){
    if(this.operationAddForm.valid)
    {
      let userOpertaionClaim:UserOpertaionClaim = new UserOpertaionClaim ();
      userOpertaionClaim = Object.assign({},this.operationAddForm.value);
      userOpertaionClaim.userId = userId;
      this.userOperationClaimService.add(userOpertaionClaim).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı");
      },err => {
        console.log(err);
        this.toastrService.error(err.error.message,"Başarısız");
      })
    }
    else
    {
      this.toastrService.error("Yetki Türü Seçmelisiniz","Dikkat");
    }
  }

}
