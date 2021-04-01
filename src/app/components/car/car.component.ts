import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:CarDetail[] = [];
  brands:Brand[] = [];
  colors:Color[] = [];
  imageUrl = environment.apiURL;
  control:boolean = false;
  filterText = "";
  selectedBrand:number;
  selectedColor:number;

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    public authService:AuthService,
    private route:Router,
    private brandService:BrandService,
    private colorService:ColorService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
       if (params["brandId"] && params["colorId"])
      {
        this.getCarsByFilter();
      }
      else if(params["colorId"])
      {
        this.getCarsByColor(params["colorId"]);
        this.getCarsByFilter();
      }
      else if (params["brandId"])
      {
        this.getCarsByBrand(params["brandId"]);
        this.getCarsByFilter();
      }
      else {
        this.getCars();
      }
    })
    this.getBrands();
    this.getColors();
  }

  getCars()
  {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
    })
  }

  getCarsByBrand(brandId:number)
  {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data;
      this.cars.length == 0 ? this.control = true : false;
      console.log(this.control);
    })
  }

  getCarsByColor(colorId:number)
  {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data;
      this.cars.length <= 0 ? this.control = true : false;
    })
  }

  getRoute(carId:number)
  {
    this.route.navigateByUrl("/cars/"+carId+"/detail");
  }

  getRouteEdit(carId:number)
  {
    this.route.navigateByUrl("/cars/"+carId+"/edit");
  }

  getBrands()
  {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors()
  {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  getCarsByFilter()
  {
    this.carService.getCarsByFilter(this.selectedBrand,this.selectedColor).subscribe(response => {
      this.cars = response.data;
    })
  }




}




