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
  previousCategoryId: number = 1;

  //Properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.listProducts();

      // const id = paramMap.get('id');
      // const keyword = paramMap.get('keyword');

      // if (keyword) {
      //   this.searchProducts(keyword);
      // } else {
      //   this.listProducts(id);
      // }
    });
  }

  listProducts() {
    const searchMode = this.route.snapshot.paramMap.has('keyword');
    if (searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get('keyword');
    if (keyword)
      this.productService.searchProducts(keyword).subscribe((data) => {
        this.products = data;
      });
  }

  handleListProducts() {
    const id = this.route.snapshot.paramMap.get('id');
    const currentCategoryId = id ? +id : 1;

    if (this.previousCategoryId !== currentCategoryId) {
      this.previousCategoryId = currentCategoryId;
      this.thePageNumber = 1;
    }

    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        currentCategoryId
      )
      .subscribe((data) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      });
  }
}
