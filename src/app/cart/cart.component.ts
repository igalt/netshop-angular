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
    this.dataService.cartFetched.subscribe( cart => this.cart = cart)
    
  }

  removeFromCart(product: Product): void{
    this.dataService.removeFromCart(product);
  }

}
