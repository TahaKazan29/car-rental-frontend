import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;

  constructor(private FormBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();

  }

  createColorAddForm()
  {
    this.colorAddForm = this.FormBuilder.group({
      name: ["",Validators.required]
    })
  }


  add(){
    if(this.colorAddForm.valid)
    {
      let brandModel = Object.assign({},this.colorAddForm.value);
      console.log(brandModel)
      this.colorService.add(brandModel).subscribe(response => {
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
