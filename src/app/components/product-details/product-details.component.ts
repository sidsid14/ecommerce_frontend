import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {
    id: 0,
    sku: '',
    name: '',
    description: '',
    unitPrice: 0,
    imageUrl: '',
    active: false,
    unitsInStock: 0,
    dateCreated: new Date(),
    lastUpdated: new Date(),
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      let id = paramMap.get('id');
      if (id) {
        this.getProductDetails(id);
      }
    });
  }

  getProductDetails(id: string) {
    this.productService.getProduct(+id).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart(product: Product) {
    const carItem = new CartItem(product);
    this.cartService.addToCart(carItem);
  }
}
