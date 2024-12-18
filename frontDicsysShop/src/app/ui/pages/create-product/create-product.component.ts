import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductsService } from '../../../data/services/products/proucts.service';
import { GlobalText } from '../../../data/text';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-create-product',
  imports: [FooterComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  productForm: FormGroup ;
  categoryId: any;
  categoryName: string | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    public globalText: GlobalText
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.categoryId = navigation.extras.state['categoryId'];
      this.categoryName = navigation.extras.state['categoryName'];
    }

    // Creo el formulario
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
    });
  }


  // Método para enviar el formulario y agregar el producto
  addProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
        const correctedProductData = {
          product_name: productData.name,
          product_description: productData.description,
          product_price: productData.price,
          product_stock: productData.stock,
          category_id: this.categoryId,
        };


      this.productsService.createProduct(correctedProductData).subscribe(
        (response) => {
          console.log('Producto agregado', response);
          alert('Producto agregado exitosamente');
          this.router.navigate(['/productos', this.categoryId]);
        },
        (error) => {
          console.error('Error al agregar producto', error);
          alert('Error al agregar producto');
        }
      );
    }
  }

}
