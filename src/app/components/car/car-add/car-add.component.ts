import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  brands:Brand[];
  colors:Color[];
  carId:number;


  constructor(private FormBuilder:FormBuilder,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  createCarAddForm()
  {
    this.carAddForm = this.FormBuilder.group({
      brandId: ["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }



  add(){
    if(this.carAddForm.valid)
    {
      let carModel = Object.assign({},this.carAddForm.value);
      this.carService.add(carModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı");
        this.carId = response.data.id;
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
