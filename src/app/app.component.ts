import { Component, inject } from '@angular/core';
import { MenuController, IonApp, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonBadge, IonRouterOutlet } from '@ionic/angular/standalone';
import { map } from 'rxjs/operators';
import { CartService } from './shared/services/cart';
import { UtilityService } from './shared/services/utility.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuController, IonApp, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonBadge, IonRouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public totalQuantity = 0;
  private menuCtrl = inject(MenuController);
  private cartService = inject(CartService);
  public utilSer = inject(UtilityService);
  constructor() {
    // subscribe and update a component property
    this.cartService.cart$.pipe(
      map(items => items.reduce((sum, i) => sum + i.quantity, 0))
    ).subscribe(count => this.totalQuantity = count);
  }

  goTo(page: string) {
    this.utilSer.navigateTo(page);
    this.menuCtrl.close('main-menu');
  }
}
