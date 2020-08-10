import { Component, OnInit } from '@angular/core';

import {DataService} from '../data.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products: Product[];
  artProducts: Product[];
  fashionProducts: Product[];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProducts().then(products =>{
      this.products = products;

      this.artProducts = this.products.filter(prod => prod.category == "arts");
      this.fashionProducts = this.products.filter(prod => prod.category == "fashion");
    });
  }
}
