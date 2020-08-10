import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Customer } from '../models/customer';
import { ShoppingCart } from '../models/shoppingCart';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customer;
  cart: ShoppingCart;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCustomer()
                    .then(customer => this.customer = customer);
    
    this.dataService.cartFetched
                    .subscribe( cart => this.cart = cart)
    
  }

}
