import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { ShoppingCart } from '../models/shoppingCart';
import { Product} from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: ShoppingCart;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //debugger;

    // 
    this.cart = this.dataService.cart;
  }

  removeFromCart(product: Product): void{
    debugger;
    this.cart.removeProduct(product);
  }

}
