import { Injectable } from '@angular/core';

import { Product } from './models/product';
import { ShoppingCart} from './models/shoppingCart';
import { Customer} from './models/customer';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly serverURL = "http://localhost:8000/api/";
  readonly productsURL = this.serverURL + "products";
  readonly customersURL = this.serverURL + "customers";
  
  public cart: ShoppingCart;

  constructor() { 
    // TODO: get from server
    this.cart = new ShoppingCart([], false);
  }

  getProducts(): Promise<Product[]>{
    return fetch(this.productsURL)
      .then(response => { return response.json()})
      .then(jsonProducts => {
        return Promise.resolve (
          jsonProducts.map(prod => 
          new Product(prod.id, prod.name, prod.price, prod.imageURL, prod.shippableTo, prod.category, prod.hasVAT)));
    });
  }

  getCustomer(): Promise<Customer>{
    return fetch(this.customersURL)
      .then(response => { return response.json()})
      .then(jsonCust => { 
        return Promise.resolve (new Customer(jsonCust.id, jsonCust.name, jsonCust.balance, jsonCust.imageURL))
      });
    }

  addToCart(product){
    this.cart.addProduct(product)
  }
}
