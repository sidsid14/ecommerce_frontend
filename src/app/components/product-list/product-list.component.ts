import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { GetResponseProducts, Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  previousCategoryId: number = 1;
  previousKeyword: string = '';

  //Properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.listProducts();
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
    if (keyword) {
      if (this.previousKeyword !== keyword) {
        this.previousKeyword = keyword;
        this.thePageNumber = 1;
      }

      this.productService
        .searchProductsPaginate(
          this.thePageNumber - 1,
          this.thePageSize,
          keyword
        )
        .subscribe(this.processResult());
    }
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
      .subscribe(this.processResult());
  }

  private processResult() {
    return (data: GetResponseProducts) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(newPageSize: number) {
    this.thePageSize = newPageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    const carItem = new CartItem(product);
    this.cartService.addToCart(carItem);
  }
}
