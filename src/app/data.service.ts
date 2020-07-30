import { Injectable } from '@angular/core';

import { Product } from './models/product';
import { ShoppingCart} from './models/shoppingCart';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly productsURL = "http://localhost:8000/api/products";
  
  cart: ShoppingCart;

  constructor() { 
    // TODO: get from server
    this.cart = new ShoppingCart([], false);
  }

  getProducts(): Promise<Product[]>{
    return fetch(this.productsURL)
      .then(response => { return response.json();})
      .then(jsonProducts => {
        return Promise.resolve (
          jsonProducts.map(prod => 
          new Product(prod.id, prod.name, prod.price, prod.imageURL, prod.shippableTo, prod.category, prod.hasVAT)));
    });
  }
}
