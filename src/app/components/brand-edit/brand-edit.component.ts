import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  brand:Brand;

  constructor(
    private brandService:BrandService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getBrandById(params["brandId"]);
    });
  }


  getBrandById(brandId:number)
  {
    this.brandService.getBrand(brandId).subscribe(data=>{
      this.brand = data.data;
    })
  }


  update(){
    this.brandService.update(this.brand).subscribe(response => {
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
