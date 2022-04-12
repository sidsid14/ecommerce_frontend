import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoyMenuComponent } from './components/product-categoy-menu/product-categoy-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoyMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
