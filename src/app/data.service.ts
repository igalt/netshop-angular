import { Injectable } from '@angular/core';
import {Product} from './models/product';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly productsURL = "http://localhost:8000/api/products";

  constructor() { }

  
  getProducts(): Promise<Product[]>{
    return fetch(this.productsURL)
          .then(response => {
              return response.json();
         }).then(jsonProducts => {
           return Promise.resolve (jsonProducts.map(prod => 
                    new Product(prod.id, prod.name, prod.price, prod.imageURL, prod.shippableTo, prod.category, prod.hasVAT)));
         })
    }

}
