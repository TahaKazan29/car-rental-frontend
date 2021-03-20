import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BankService } from 'src/app/services/bank.service';
import { Bank } from 'src/app/models/bank';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CarService } from 'src/app/services/car.service';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { Car } from 'src/app/models/car';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css'],
  providers: [
    // {provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}}
  ]
})
export class HireComponent implements OnInit {

  rental:Rental = new Rental();
  bank:Bank = new Bank();
  customer:Customer;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  car:Car = new Car();
  payment:number;

  constructor(private formBuilder: FormBuilder,
    private bankService:BankService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private rentalService:RentalService,
    private toastrService:ToastrService
    ) {}

  ngOnInit() {
      this.createAddForm();
      this.activatedRoute.params.subscribe((parameter) => {
        if (parameter["carId"]) {
            this.getCar(parameter["carId"]);
        }
        if(parameter["rentId"])
        {
          this.getRental(parameter["rentId"])
        }
        // else {

        // }
      })

  }

  createAddForm()
  {
    this.firstFormGroup = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }


  getCar(carId:number)
  {
    this.carService.getCarsForDetail(carId).subscribe(response => {
      this.car = response.data;
    })
  }

  getRental(rentId:number)
  {
    this.rentalService.getRental(rentId).subscribe(response => {
      this.bank.rentId = response.data.id;
    })
  }

  paymentFee()
  {
    var rentDate = new Date(this.firstFormGroup.controls["rentDate"].value.toString());
    var returnDate = new Date(this.firstFormGroup.controls["returnDate"].value.toString());
    var difference= returnDate.getTime() - rentDate.getTime();
    var time = Math.ceil(difference / (1000 * 3600 * 24));
    this.payment = this.car.dailyPrice * time
  }



  addRental(value:Customer)
  {
    this.customer = value;
    this.rental.carId = this.car.id;
    this.rental.customerId = this.customer.id;
    this.rental.rentDate =this.firstFormGroup.controls["rentDate"].value
    this.rental.returnDate =this.firstFormGroup.controls["returnDate"].value
    this.rentalService.addRental(this.rental).subscribe((result) => {
       this.toastrService.success("Kayıt Oluşturuldu");
       this.rental.id = result.data.id
     });
  }

  addBank()
  {
    this.bank = Object.assign({},this.secondFormGroup.value);
    this.bank.rentId = this.rental.id
    console.log(this.bank);
    this.bankService.addBank(this.bank).subscribe(() => {
      this.toastrService.success("Araç Kiralandı");
    })
  }



}
