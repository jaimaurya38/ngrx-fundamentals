import { createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductsState {
    showProdctCode: boolean;
    loading: boolean;
    products: Product[];
    errorMessage: string;
}

const initialState: ProductsState = {
    showProdctCode: true,
    loading: false,
    products: [],
    errorMessage: ''
}

export const productReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
        ...state,
        showProdctCode: !state.showProdctCode
    })),
    on(ProductsPageActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        products: [],
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsLoadSuccess, (state, { products }) => ({
        ...state,
        loading: false,
        products
    })),
    on(ProductsAPIActions.productsAddedFail, (state, { message }) => ({
        ...state,
        loading: false,
        products: [],
        errorMessage: message
    })),
    on(ProductsPageActions.addProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsAddedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: [...state.products, product]
    })),
    on(ProductsAPIActions.productsAddedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),
    on(ProductsPageActions.updateProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsUpdatedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: state.products.map((existingProduct) => existingProduct.id === product.id ? product : existingProduct)
    })),
    on(ProductsAPIActions.productsAddedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),
    on(ProductsPageActions.deleteProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsDeletedSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        products: state.products.filter((existingProduct) => existingProduct.id !== id)
    })),
    on(ProductsAPIActions.productsDeletedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    }))
)