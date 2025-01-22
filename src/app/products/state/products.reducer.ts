import { createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductsState {
    showProdctCode: boolean;
    loading: boolean;
    products: Product[];
}

const initialSate: ProductsState = {
    showProdctCode: true,
    loading: false,
    products: []
}

export const productReducer = createReducer(
    initialSate,
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
        ...state,
        showProdctCode: !state.showProdctCode
    })),
    on(ProductsPageActions.loadProducts, (state) => ({
        ...state,
        loading: true
    })),
    on(ProductsAPIActions.productsLoadSuccess, (state, { products }) => ({
        ...state,
        loading: false,
        products
    }))
)