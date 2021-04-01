import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  car:Car;
  colors:Color[];
  brands:Brand[];
  selectedColor:number;
  selectedBrand:number;

  constructor(
    private colorService:ColorService,
    private brandService:BrandService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
    this.activatedRoute.params.subscribe(params=>{
      this.getCarById(params["carId"]);
    });


  }


  getCarById(carId:number)
  {
    this.carService.getCar(carId).subscribe(data=>{
      this.car = data.data;
      this.selectedColor = this.car.colorId;
    })
  }

  // getColor()
  // {
  //   this.colorService.getColors().subscribe(data=>{
  //     this.colors = data.data;
  //   })
  // }

  // getBrandById(brandId:number)
  // {
  //   this.brandService.getBrands().subscribe(data=>{
  //     this.brands = data.data;
  //   })
  // }


  update(){
    // console.log(this.colors.id)
    this.carService.update(this.car).subscribe(response => {
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

}
