import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();
  private storageInitialized = false;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    this.storageInitialized = true;
    const storedCart = await this.storage.get('cart');
    if (storedCart) {
      this.cartSubject.next(storedCart);
    }
  }

  private saveCart() {
    if (this.storageInitialized) {
      this.storage.set('cart', this.cartSubject.getValue());
    }
  }

  addToCart(product: Product): void {
    const items = [...this.cartSubject.getValue()];
    const index = items.findIndex(i => i.product.id === product.id);

    if (index > -1) {
      items[index].quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }

    this.cartSubject.next(items);
    this.saveCart();
  }

  increaseQty(productId: number): void {
    const items = [...this.cartSubject.getValue()];
    const index = items.findIndex(i => i.product.id === productId);
    if (index > -1) {
      items[index].quantity += 1;
      this.cartSubject.next(items);
      this.saveCart();
    }
  }

  decreaseQty(productId: number): void {
    const items = [...this.cartSubject.getValue()];
    const index = items.findIndex(i => i.product.id === productId);
    if (index > -1) {
      if (items[index].quantity > 1) {
        items[index].quantity -= 1;
      } else {
        items.splice(index, 1);
      }
      this.cartSubject.next(items);
      this.saveCart();
    }
  }

  removeItem(productId: number): void {
    const items = this.cartSubject.getValue()
      .filter(i => i.product.id !== productId);
    this.cartSubject.next(items);
    this.saveCart();
  }

  getTotal(): number {
    return this.cartSubject.getValue()
      .reduce((sum, i) => sum + (i.product.price * i.quantity), 0);
  }
}
