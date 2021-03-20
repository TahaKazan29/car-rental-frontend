import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44318/api/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbybrand/" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbycolor/" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsForDetail(carId:number):Observable<ItemResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getforcardetail/" + carId;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath);
  }

  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<Car>> {
    let newPath:string = "";
    if(brandId != undefined && colorId != undefined)
    newPath = this.apiUrl + "cars/getcarsbyfilter?brandId=" + brandId + "&colorId=" + colorId;
    else if(brandId != undefined)
    newPath = this.apiUrl + "cars/getcarsbyfilter?brandId=" + brandId;
    else if(colorId != undefined)
    newPath = this.apiUrl + "cars/getcarsbyfilter?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

}
