import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

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
  readonly cartsURL = this.serverURL + "carts";

  public cartFetched = new EventEmitter();

  public cart: ShoppingCart;
  
  constructor() { 

    this.getCart().then(cart => {
      this.cart = cart;
      this.cartFetched.emit(this.cart);
    });
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

  getCart(): Promise <ShoppingCart>{
    return fetch(`${this.cartsURL}/5f2942bbb2b9b7625012e3f9`)
      .then(response => { return response.json()})
      .then(jsonCart => { 
        return Promise.resolve (ShoppingCart.fromJSON(jsonCart));
      });
  }
    
  addToCart(product: Product): void{
    // add product to the model
    let isAdded = this.cart.addProduct(product)
    
    if (isAdded){
      // add product to the DB
      fetch(`${this.cartsURL}/5f2942bbb2b9b7625012e3f9/products`, {          
        // Adding method type 
        method: "POST", 
        // Adding body or contents to send 
        body: JSON.stringify({ 
            productId: product.id
        }),     
        // Adding headers to the request 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
      }).then(response => console.log(response))
        .catch(err => console.error(err));
      }

  }

  removeFromCart(product: Product){
    this.cart.removeProduct(product);

     // removing product to the DB
     fetch(`${this.cartsURL}/5f2942bbb2b9b7625012e3f9/products/${product.id}` , {          
      method: "DELETE"        
    }).then(res =>console.log('product removed from cart'))
      .catch(err => console.error(err));


  }
}
