import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  addProduct(productData: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:4000/api/productos';

  constructor(private http: HttpClient) {}



  public getProductoByCategory(id_category: number) {
    return this.http.get(`${this.apiUrl}/${id_category}`);
  }

  // Crear un nuevo producto
  createProduct(product: any) {
    console.log('Enviando producto a la API:', product);
    return this.http.post(this.apiUrl, product);
  }

  // Eliminar un producto por ID
  deleteProduct(productId: number) {
    console.log('Eliminando producto con ID:', productId);
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}
