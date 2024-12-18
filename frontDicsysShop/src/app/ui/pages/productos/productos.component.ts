import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductsService } from '../../../data/services/products/proucts.service';
import { GlobalText } from '../../../data/text';
import { Globalurl } from '../../../data/url';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { UrlNavigateService } from '../../../services/url-navigate.service';

@Component({
  selector: 'app-productos',
  imports: [NgFor, HeaderComponent, FooterComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  listProdBYCategoria: any;
  categoryId;
  categoryName;
  constructor(
    public globalText: GlobalText,
    public router: Router,
    public productsService: ProductsService,
    public urlNavigateService: UrlNavigateService,
    public globalurl: Globalurl
  ) {
    const navegabilidad = this.router.getCurrentNavigation();

    // Verificar el objeto completo de la navegación
    console.log('Objeto de navegabilidad:', navegabilidad);

    if (navegabilidad?.extras?.state) {
      this.categoryId = navegabilidad.extras.state['categoryId'];
      this.categoryName = navegabilidad.extras.state['categoryName'];

      // Verifica que el category_id se haya recibido correctamente
      console.log('Category ID recibido: ', this.categoryId);
      console.log('Category Name recibido: ', this.categoryName);
    }

    this.productsService
      .getProductoByCategory(this.categoryId)
      .subscribe((result: any) => {
        console.log(result);
        this.listProdBYCategoria = result;
      });

    console.log(
      'Productos cargados en listProdBYCategoria:',
      this.listProdBYCategoria
    );
  }

  deleteProd(productId: any) {
    this.productsService.deleteProduct(productId).subscribe((result) => {
      location.reload();
      console.error('producto eliminado', result);
    });
  }

  // Método para navegar a la página de creación de producto

  goToCreateProduct() {
    console.log('Navegando al formulario de creación de productos...');

    // Aquí estamos pasando la categoriaId para que el formulario sepa a qué categoría corresponde
    this.urlNavigateService.navigateData(this.globalurl.crearProduct, {

      categoryId: this.categoryId,
      categoryName: this.categoryName,
    });
  }
}
