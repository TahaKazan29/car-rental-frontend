import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44318/api/rentals";

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "/getrentaldetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRental(rentId:number):Observable<ItemResponseModel<Rental>> {
    let newPath = this.apiUrl + "/getrentaldetails/" + rentId;
    return this.httpClient.get<ItemResponseModel<Rental>>(newPath);
  }

  addRental(rental: Rental): Observable<ItemResponseModel<Rental>> {
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ItemResponseModel<Rental>>(newPath,rental);
  }

}
