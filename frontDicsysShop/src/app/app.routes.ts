import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home.component';
import  {ProductosComponent} from  './ui/pages/productos/productos.component';
import { CategoriasComponent } from './ui/pages/categorias/categorias.component';
import { CreateProductComponent } from './ui/pages/create-product/create-product.component';


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
  },
  {
    path: 'productos/crear',
    component: CreateProductComponent,
  },
];
