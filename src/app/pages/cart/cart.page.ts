import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
  IonContent, IonGrid, IonRow, IonCol, IonCard, IonItem, IonThumbnail,
  IonLabel, IonButton, IonIcon, IonFooter, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { CartService, CartItem } from 'src/app/services/cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

addIcons({ trashOutline });

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonIcon,
    IonFooter
  ],
})
export class CartPage {
  private toastCtrl = inject(ToastController);
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cart$;
    this.total$ = this.cartService.cart$.pipe(
      map(items => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0))
    );
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();
  }

  increase(id: number) {
    this.cartService.increaseQty(id);
    this.showToast('Quantity increased');
  }

  decrease(id: number) {
    this.cartService.decreaseQty(id);
    this.showToast('Quantity decreased');
  }

  remove(id: number) {
    this.cartService.removeItem(id);
    this.showToast('Item removed from cart');
  }
}
