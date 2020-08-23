import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { ShoppingCart } from '../models/shoppingCart';
import { Product } from '../models/product';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: ShoppingCart;
  customer: Customer;

  showCheckout: boolean = false;
  email: string; // Don't forget to add formsModule to appModule so that ngModel binding will work
  shippingCountry: string;
  checkoutSuccess: boolean = false;
  checkoutError: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.cartFetched.subscribe( cart => this.cart = cart)
    this.dataService.getCustomer().then ( cust => this.customer = cust);
  }

  openCheckout(): void{
    this.showCheckout = true;
  }

  checkout(): void{
    let bSuccess = this.cart.checkout(this.customer);
    if (bSuccess){
      bSuccess = this.dataService.checkoutCart(this.email, this.shippingCountry);
    }

    if (bSuccess){
      this.checkoutSuccess = true;
      this.checkoutError = false;
    } else{
      this.checkoutSuccess = false;
      this.checkoutError = true;
    }

  }
  removeFromCart(product: Product): void{
    this.dataService.removeFromCart(product);
  }

}
