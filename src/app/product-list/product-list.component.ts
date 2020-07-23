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

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProducts().then(products =>{
      this.products = products;

    });
  }
}
