import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular/standalone';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public currentPage = '';

  private router: Router = inject(Router);
  private navControl: NavController = inject(NavController);

  public navigateTo(link: string, replaceUrl: boolean = false): Promise<boolean> {
    this.currentPage = link;  // track current page
    return this.router.navigate([`/${link}`], { replaceUrl });
  }

  public navigateToWithData(link: string, data: any, replaceUrl: boolean = false): Promise<boolean> {
    this.currentPage = link;
    return this.router.navigate([`/${link}`], { state: { data }, replaceUrl });
  }

  public onBackPress(): void {
    this.navControl.back();
  }
}
