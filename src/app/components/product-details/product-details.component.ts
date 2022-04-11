import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/common/product';
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
    private route: ActivatedRoute
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
}
