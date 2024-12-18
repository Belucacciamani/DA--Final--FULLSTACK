 import { Component } from '@angular/core';
 import { GlobalText } from '../../../data/text';
 import { HeaderComponent } from "../../components/header/header.component";
 import { FooterComponent } from "../../components/footer/footer.component";
 import { UrlNavigateService } from '../../../services/url-navigate.service';
 import { Globalurl } from '../../../data/url';
 import { NgFor } from '@angular/common';
 import { CategoriesService } from '../../../data/services/categories/categories.service';

 @Component({
   selector: 'app-home',
   imports: [HeaderComponent, FooterComponent, NgFor],
   templateUrl: './home.component.html',
   styleUrl: './home.component.css',
})
 export class HomeComponent {

   categories: any;
   constructor(
     public globalText: GlobalText,
     public urlNavigateService: UrlNavigateService,
     public globalurl: Globalurl,
     public categoriesService: CategoriesService
   ) {
     this.categoriesService.getCategories().subscribe((result) => {
       console.log('Categorías obtenidas:', result);
       this.categories= result
     });
   }

   browseProducts(categoria: any) {
     console.log('Navegando con estos parámetros:', {
       categoryId: categoria.id_category,
       categoryName: categoria.category_name,
     });
     this.urlNavigateService.navigateData(this.globalurl.products, {
       categoryId: categoria.id_category,

       categoryName: categoria.category_name,
     });
   }

    browserCategories(categoria: number) {
      this.urlNavigateService.browseUrl(
        `${this.globalurl.products}/${categoria}`
      );
    }


 }
