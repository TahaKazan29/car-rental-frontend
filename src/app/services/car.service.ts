import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44318/api/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCar(carId:number):Observable<ItemResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/" + carId;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcarsbybrand/" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcarsbycolor/" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsForDetail(carId:number):Observable<ItemResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getforcardetail/" + carId;
    return this.httpClient.get<ItemResponseModel<CarDetail>>(newPath);
  }

  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath:string = "";
    if(brandId != undefined && colorId != undefined)
    newPath = this.apiUrl + "cars/getcarsbyfilter?brandId=" + brandId + "&colorId=" + colorId;
    else if(brandId != undefined)
    newPath = this.apiUrl + "cars/getcarsbyfilter?brandId=" + brandId;
    else if(colorId != undefined)
    newPath = this.apiUrl + "cars/getcarsbyfilter?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car:Car):Observable<ItemResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ItemResponseModel<Car>>(newPath,car);
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.put<ResponseModel>(newPath,car);
  }

  delete(car:Car):Observable<ItemResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/delete";
    return this.httpClient.post<ItemResponseModel<Car>>(newPath,car);
  }

}
