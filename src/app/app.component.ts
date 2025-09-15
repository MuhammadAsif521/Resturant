import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from './services/cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  totalQuantity$: Observable<number>;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private cartService: CartService
  ) {
   this.totalQuantity$ = this.cartService.cart$.pipe(
  map(items => items.length) // counts unique products only
);

  }

  goTo(page: string) {
    this.router.navigate([page]).then(() => {
      this.menuCtrl.close('main-menu'); // close menu after navigation
    });
  }
}
