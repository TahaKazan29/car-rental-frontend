import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BankService } from 'src/app/services/bank.service';
import { Bank } from 'src/app/models/bank';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CarService } from 'src/app/services/car.service';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { CarDetail } from 'src/app/models/carDetail';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { CreditNoteService } from 'src/app/services/creditNote.service';
import { CreditNote } from 'src/app/models/creditNote';
import { timer } from 'rxjs';
import { RegisteredCreditCardService } from 'src/app/services/registeredCreditCard.service';
import { RegisteredCreditCard } from 'src/app/models/registeredCreditCard';


@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class HireComponent implements OnInit,OnChanges,OnDestroy{

  rental:Rental = new Rental();
  bank:Bank = new Bank();
  creditCards:RegisteredCreditCard[];
  customer:Customer = new Customer();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  car:CarDetail = new CarDetail();
  payment:number;
  creditNote:CreditNote = new CreditNote();
  findeksValue:number;
  control:boolean = true;


  constructor(private formBuilder: FormBuilder,
    config: NgbModalConfig, private modalService: NgbModal,
    private bankService:BankService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private customerService:CustomerService,
    private registeredCreditCard:RegisteredCreditCardService,
    private creditNoteService:CreditNoteService,
    private authService:AuthService,
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private router:Router,
    ) {}

  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
      this.customer.id = Number(localStorage.getItem("customerId"));
      this.getCustomerByRegisterCreditCard(this.customer.id);
      this.createAddForm();
      this.activatedRoute.params.subscribe((parameter) => {
        if (parameter["carId"]) {
            this.getCar(parameter["carId"]);
        }
      })

  }

  open(content:any) {
    this.modalService.open(content);
  }

  close(content:any){
    this.modalService.dismissAll(content);
  }

  cardRegistrationQuestion(contentt:any)
  {
    if (this.control) {
      this.modalService.open(contentt);
    }
  }

  createAddForm()
  {
    this.firstFormGroup = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      companyName:['',Validators.required]
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


  paymentFee()
  {
    var rentDate = new Date(this.firstFormGroup.controls["rentDate"].value.toString());
    var returnDate = new Date(this.firstFormGroup.controls["returnDate"].value.toString());
    var difference= returnDate.getTime() - rentDate.getTime();
    var time = Math.ceil(difference / (1000 * 3600 * 24));
    this.payment = this.car.dailyPrice * time
  }

 addCreditNote()
  {
    this.creditNote.userId = parseInt(this.authService.getCurrentUser().nameid);
    return this.creditNoteService.add(this.creditNote);
  }

  addCustomer()
  {
    this.customer.userId = parseInt(this.authService.getCurrentUser().nameid);
    this.customer.companyName = this.firstFormGroup.controls['companyName'].value;
    return this.customerService.add(this.customer);
  }

  addRental()
  {
    this.rental.customerId = this.customer.id;
    this.rental.carId = this.car.id;
    this.rental.rentDate =this.firstFormGroup.controls["rentDate"].value
    this.rental.returnDate =this.firstFormGroup.controls["returnDate"].value
    return this.rentalService.addRental(this.rental);
  }

  localSaved(customerId:number)
  {
    localStorage.setItem("customerId",customerId.toString());
  }

  savedCard(creditCard:RegisteredCreditCard,content:any)
  {
    this.secondFormGroup.patchValue({
      nameOnTheCard:creditCard.nameOnTheCard,
      expirationDate:creditCard.expirationDate,
      cvv:creditCard.cvv,
      cardNumber:creditCard.cardNumber
    })
    this.control = false;
    this.open(content);
  }

  removeCard(creditCard:RegisteredCreditCard)
  {
    this.registeredCreditCard.delete(creditCard).subscribe(() => {
      this.getCustomerByRegisterCreditCard(this.customer.id);
      this.toastrService.info("Kartınız Silindi");
    },err => {
      this.toastrService.info(err);
    })
  }

  async addBank()
  {
    this.addCreditNote().subscribe(response => {
      this.findeksValue = response.data.findeksValue;
    })
    timer(500).subscribe(p => {
      if (this.findeksValue >= this.car.findeksValue) {
        if (this.customer.id == 0)
      {
        this.addCustomer().subscribe(response => {
          this.customer.id = response.data.id
          this.localSaved(this.customer.id);
        })
      }
      timer(500).subscribe(p => {
        this.addRental().subscribe(response => {
          this.rental.id = response.data.id;
          timer(1000).subscribe(p => {
            this.bank = Object.assign({},this.secondFormGroup.value);
            this.bank.rentId = this.rental.id;
            this.bankService.addBank(this.bank).subscribe(response => {
              this.toastrService.success("Araç Kiralandı");
            })
          })
        },err => {
          this.toastrService.error(err.error.message,"Başarısız");
          this.router.navigate(['/cars'])
        })
      })

      }
      else
      {
        this.control = false;
        this.toastrService.error("Üzügüm Findeks Puanınız Bu Aracı Kiralamak İçin Yeterli Değil","Başarısız")
        this.router.navigate(['/cars'])
      }
    })
  }

  cardSaved()
  {
    let newCart:RegisteredCreditCard = new RegisteredCreditCard;
    newCart = Object.assign({},this.secondFormGroup.value);
    newCart.customerId = this.customer.id
    this.registeredCreditCard.add(newCart).subscribe(response => {
      this.getCustomerByRegisterCreditCard(this.customer.id);
      this.toastrService.info("Kredi Kartınız Kayıt Edildi","Başarılı")
      timer(1000).subscribe(p => {
        this.router.navigate(['/cars']);
      })
    })
  }

  getCustomerByRegisterCreditCard(customerId:number)
  {
    this.registeredCreditCard.getCustomerByRegisteredCreditCard(customerId).subscribe(response => {
      this.creditCards = response.data
    })
  }




}
