import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:Rental[] = [];
  // car:Car;
  // customer:Customer;

  constructor(private rentalService:RentalService,private carService:CarService,private customerService:CustomerService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((parameter) => {
    //   if (parameter['carId']) {
    //     this.getCar(parameter['carId']);
    //   }
    //   if(parameter['customerId']) {
    //     this.getCustomer(parameter['custtomerId']);
    //   }
    // });
    this.getRentals();
  }

  getRentals()
  {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
    })
  }

  // getCar(carId:number)
  // {
  //   this.carService.getCarsForDetail(carId).subscribe(response => {
  //     this.car = response.data;
  //   })
  // }

  // getCustomer(customerId:number){
  //   this.customerService.getCustomer(customerId).subscribe(response => {
  //     this.customer = response.data;
  //   })
  // }

  // addRental(rental:Rental)
  // {
  //   this.rentalService.addRental(rental);
  // }

}
