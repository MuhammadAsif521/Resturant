import { Routes } from '@angular/router';
import { MenuPage } from './pages/menu/menu.page';
import { CartPage } from './pages/cart/cart.page';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then(m => m.MenuPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then(m => m.CartPage)
  }
];
