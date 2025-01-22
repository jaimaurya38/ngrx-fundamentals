import { Component } from '@angular/core';
import { sumProducts } from 'src/app/utils/sum-products';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from '../state/products.actions';
import { state } from '@angular/animations';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$ = this.store.select((state: any) => state.product.products);;
  total = 0;
  loading$ = this.store.select((state: any) => !(state.product.loading));
  //fetch value from store using (selector state-slice)
  showProductCod$ = this.store.select((state: any) => state.product.showProdctCode);
  errorMessage = '';

  constructor(private productsService: ProductsService, private store: Store) {
    this.store.subscribe((store) => console.log(store));
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(ProductsPageActions.loadProducts())
    this.productsService.getAll().subscribe({
      next: (products) => {
        //this.products = products;
        this.store.dispatch(ProductsAPIActions.productsLoadSuccess({ products }));
        this.total = sumProducts(products);
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    // update state by calling dispatch
    //this.store.dispatch({ type: '[Product Page] Toggle show Product code' });
    this.store.dispatch(ProductsPageActions.toggleShowProductCode())
  }
}
