import { Routes } from '@angular/router';
import { MenuPage } from './pages/menu/menu.page';
import { CartPage } from './pages/cart/cart.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    component: MenuPage,
  },
  {
    path: 'cart',
    component: CartPage,
  },
];
