import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;

  constructor(private FormBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm()
  {
    this.brandAddForm = this.FormBuilder.group({
      name: ["",Validators.required],
      image:["",Validators.required]
    })
  }


  add(){
    if(this.brandAddForm.valid)
    {
      let brandModel = Object.assign({},this.brandAddForm.value);
      console.log(brandModel)
      this.brandService.add(brandModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı");
      },responseError => {
        console.log(responseError)
        if (responseError.error.Errors.length > 0) {
          for(let i = 0; i < responseError.error.Errors.length; i++)
          {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
       })
    }
    else
    {
      this.toastrService.error("Formunuz Eksik ya da Hatalı","Dikkat");
    }
  }

}
