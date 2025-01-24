import { Component } from '@angular/core';
import {  Router } from '@angular/router';
//import { Observable } from 'rxjs';
import { Product } from '../product.model';
import { Store } from '@ngrx/store';
import { selectProductById, selectProductsLoading } from '../state/products.selectors';
import { ProductsPageActions } from '../state/products.actions';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  //product$: Observable<Product | undefined> | undefined;
  product$ = this.store.select(selectProductById);
  loading$ = this.store.select(selectProductsLoading);

  constructor(
    private router: Router,
    private store: Store
  ) { }

  // ngOnInit() {
  //   const productId = parseInt(this.activatedRoute.snapshot.params['id']);
  //   this.getProduct(productId);
  // }
  /* relaod issue -> handel by Effect hook ngrxOnInitEffects in effec file */

  // getProduct(id: number) {
  //   //this.product$ = this.productsService.getById(id);
  //   this.product$ = this.store.select(selectProductById(id));
  // }

  addProduct(product: Product) {
    //this.productsService.add(product).subscribe(this.goToProductsPage);
    this.store.dispatch(ProductsPageActions.addProduct({ product }));
  }
  
  updateProduct(product: Product) {
    //this.productsService.update(product).subscribe(this.goToProductsPage);
    this.store.dispatch(ProductsPageActions.updateProduct({ product }));
  }

  deleteProduct(id: number) {
    //this.productsService.delete(id).subscribe(this.goToProductsPage);
    this.store.dispatch(ProductsPageActions.deleteProduct({ id }));
  }

  goToProductsPage = () => this.router.navigate(['/products']);
}
