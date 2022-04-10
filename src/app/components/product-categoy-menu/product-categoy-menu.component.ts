import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-categoy-menu',
  templateUrl: './product-categoy-menu.component.html',
  styleUrls: ['./product-categoy-menu.component.scss'],
})
export class ProductCategoyMenuComponent implements OnInit {
  productCategories!: ProductCategory[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    });
  }
}
