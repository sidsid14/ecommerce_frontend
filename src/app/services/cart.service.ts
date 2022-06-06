import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  storage: Storage = sessionStorage;

  constructor() {
    let data = this.storage.getItem('cartItems');
    if (data != null) {
      this.cartItems = JSON.parse(data);
      this.computeCartTotals();
    }
  }

  addToCart(cartItem: CartItem) {
    const existingCartItem: CartItem = this.cartItems.find(
      (item) => item.id === cartItem.id
    )!;

    let alreadyExistsInCart: boolean = existingCartItem !== undefined;

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
    this.persistCartItems();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(cartIem: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      (item) => item.id === cartIem.id
    );

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    for (let currentCartItem of this.cartItems) {
      const subTotalPrice =
        currentCartItem.quantity * currentCartItem.unitPrice;
      console.log(
        `name: ${currentCartItem.name}, quantity: ${currentCartItem.quantity},
         unitPrice: ${currentCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`
      );
    }
    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
    console.log('---');
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
