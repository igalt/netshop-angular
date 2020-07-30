import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';
import { ShoppingCart } from '../models/shoppingCart';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private dataService: DataService) { }

  ngOnInit(): void{
  }

  addToCart(product): void{
    this.dataService.cart.addProduct(product);
  }
}
