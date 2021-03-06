import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImages } from 'src/app/models/carImages';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {

  car:CarDetail;
  carImages:CarImages[];
  imageUrl = environment.apiURL;

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute)
  {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarsForDetails(params["carId"]);
      }
    })
  }

  getCarsForDetails(carId:number)
  {
    this.carService.getCarsForDetail(carId).subscribe(response => {
      this.car = response.data;
      this.carImages = response.data.carImages;
      // console.log(this.car);
    })
  }

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

}
