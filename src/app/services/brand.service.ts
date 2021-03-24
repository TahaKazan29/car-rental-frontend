import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44318/api/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + "brands";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrand(brandId:number):Observable<ItemResponseModel<Brand>> {
    let newPath = this.apiUrl +"brands/"+ brandId;
    return this.httpClient.get<ItemResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/update";
    return this.httpClient.put<ResponseModel>(newPath,brand);
  }



}
