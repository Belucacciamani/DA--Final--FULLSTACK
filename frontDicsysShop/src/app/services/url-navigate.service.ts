import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlNavigateService {
  constructor(private router: Router) {}

  //navegar sin pasar datos
  browseUrl(url: string, p0?: { state: { category_id: any; category_name: any; }; }) {
    this.router.navigateByUrl(url);
  }

  //navegar PASANDO DATOS

  navigateData(url: string, params: any){
    console.log('Navegando con estos datos:', params);
    this.router.navigate([url],  {state:params});
}




}
