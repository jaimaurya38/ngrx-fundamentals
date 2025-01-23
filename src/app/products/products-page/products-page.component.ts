import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from '../state/products.actions';
import { selectProducts, selectProductsLoading, selectProductsShowProductCode, selectProductsCount, selectProductsTotal } from '../state/products.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPageComponent {
  products$ = this.store.select(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  totalProductCount$ = this.store.select(selectProductsCount);
  loading$ = this.store.select(selectProductsLoading);
  //fetch value from store using (selector state-slice)
  showProductCode$ = this.store.select(selectProductsShowProductCode);
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
        //this.total = sumProducts(products);
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    // update state by calling dispatch
    //this.store.dispatch({ type: '[Product Page] Toggle show Product code' });
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
