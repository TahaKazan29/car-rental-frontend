import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-selection',
  templateUrl: './customer-selection.component.html',
  styleUrls: ['./customer-selection.component.css']
})
export class CustomerSelectionComponent implements OnInit {

  customers:Customer[] = [];
  @Output() newItemEvent = new EventEmitter<Customer>();


  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers()
  {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
    })
  }

  addNewItem(value: Customer) {
    this.newItemEvent.emit(value);
  }

}
