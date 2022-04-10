import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products!: Product[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      const keyword = paramMap.get('keyword');

      if (keyword) {
        this.searchProducts(keyword);
      } else {
        this.listProducts(id);
      }
    });
  }

  listProducts(id: string | null) {
    const currentCategoryId = id ? +id : 1;
    this.productService.getProductList(currentCategoryId).subscribe((data) => {
      this.products = data;
    });
  }

  searchProducts(keyword: string | null) {
    if (keyword)
      this.productService.searchProducts(keyword).subscribe((data) => {
        this.products = data;
      });
  }
}
