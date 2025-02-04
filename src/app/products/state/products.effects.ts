import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
        private router: Router
    ) { }

    ngrxOnInitEffects() {
        return ProductsPageActions.loadProducts();
    }

    /* 
        concatMap => Race condition is "NOT" possible -> Runs subscription/request in order and is less perform (when order is importent)
        mergeMap => Race condition is possible -> Runs subscription/request in Parller and when order is "NOT" importent
        exhaustMap => Race condition is possible -> Ignores all subsquent subscription/request untill complete initial one (opposite to switchMap)
        switchMap => Race condition is possible -> Cancel current subscription/request and Prossed new one
    */

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.loadProducts),
            exhaustMap(() =>
                this.productsService
                    .getAll()
                    .pipe(
                        map((products: Product[]) => ProductsAPIActions.productsLoadSuccess({ products })),
                        catchError(
                            (error) => of(ProductsAPIActions.productsAddedFail({ message: error }))
                        )
                    )
            )
        )
    );

    addProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.addProduct),
            mergeMap(({ product }) =>
                this.productsService
                    .add(product)
                    .pipe(
                        map((product: Product) => ProductsAPIActions.productsAddedSuccess({ product })),
                        catchError(
                            (error) => of(ProductsAPIActions.productsAddedFail({ message: error }))
                        )
                    )
            )
        )
    );

    updateProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.updateProduct),
            concatMap(({ product }) =>
                this.productsService.update(product).pipe(
                    map(() => ProductsAPIActions.productsUpdatedSuccess({ product })),
                    catchError(
                        (error) => of(ProductsAPIActions.productsUpdatedFail({ message: error }))
                    )
                )
            )
        )
    );

    DeleteProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.deleteProduct),
            mergeMap(({ id }) =>
                this.productsService
                    .delete(id)
                    .pipe(
                        map(() => ProductsAPIActions.productsDeletedSuccess({ id })),
                        catchError(
                            (error) => of(ProductsAPIActions.productsDeletedFail({ message: error }))
                        )
                    )
            )
        )
    );

    redirectToProductPage = createEffect(() =>
        this.actions$.pipe(
            ofType(
                ProductsAPIActions.productsAddedSuccess,
                ProductsAPIActions.productsUpdatedSuccess,
                ProductsAPIActions.productsDeletedSuccess
            ),
            tap(() => {
                this.router.navigate(['/products'])
            })
        )
        , {
            dispatch: false
        })
}