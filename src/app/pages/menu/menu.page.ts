// menu.page.ts
import { Component, inject } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
  IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonSearchbar,
  ToastController
} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, Product } from 'src/app/shared/services/cart';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    // Angular
    AsyncPipe,
    FormsModule,

    // Ionic Components
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
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSearchbar
  ],
})
export class MenuPage {
  private cartService = inject(CartService);
  private toast  = inject(ToastController);

  // original products list (untouched)
  menuItems: Product[] = [
    { id: 1, name: 'Cheese Burger', price: 450, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaPxqV3OVu6H1JmN1EGTx-l1Igkzm1REOEzA&s' },
    { id: 2, name: 'Pepperoni Pizza', price: 1200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FtLkRWNB8PmyvwOqk3FIfwv9VUE77E5sHw&s' },
    { id: 3, name: 'Pasta Alfredo', price: 950, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzx_8Cu6lIfem6DiJGa8FjsQdmN1p17ULzw&s' },
    { id: 4, name: 'Cold Drink', price: 120, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzFcTgHrwwW8ihRwSxzzoRl6yDlJNYhaQxtw&s' },
    { id: 5, name: 'French Fries', price: 200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvpR11n08KFrJwbwagUHN8--n8mffITpVOZw&s' },
    { id: 6, name: 'Chicken Wings', price: 600, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2a3y2a3QvCFOtefXtQKQxKBElNZNucEGttnp-dopOQRlzBsXuuN-bCMLcbLMUfVg-EAo&usqp=CAU' },
  ];

  // filtered list (for UI)
  filteredItems: Product[] = [...this.menuItems];

  searchQuery: string = '';

  onSearchChange(event: any) {
    const query = event.detail.value?.toLowerCase() || '';
    if (!query.trim()) {
      this.filteredItems = [...this.menuItems]; // reset to all products
      return;
    }

    this.filteredItems = this.menuItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.price.toString().includes(query)
    );
  }

  async addToCart(item: Product): Promise<void> {
    this.cartService.addToCart(item);

    const toast = await this.toast.create({
      message: `${item.name} added to cart`,
      duration: 1500,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline'
    });

    await toast.present();
  }
}
