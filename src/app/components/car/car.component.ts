import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = [];
  imageUrl = environment.apiURL;
  control:boolean = false;

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }
      else if (params["colorId"])
      {
        this.getCarsByColor(params["colorId"]);
      }
      else {
        this.getCars();
      }
    })
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

}




