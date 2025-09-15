import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { CartService,CartItem } from 'src/app/services/cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

addIcons({ trashOutline });

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CartPage {
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cart$;
    this.total$ = this.cartService.cart$.pipe(
      map(items =>
        items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
      )
    );
  }

  increase(id: number) {
    this.cartService.increaseQty(id);
  }

  decrease(id: number) {
    this.cartService.decreaseQty(id);
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }
}
