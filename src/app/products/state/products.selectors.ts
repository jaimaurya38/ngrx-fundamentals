import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducer";
import { sumProducts } from "src/app/utils/sum-products";
import { getRouterSelectors } from "@ngrx/router-store";

const countOfProducts = (state: ProductsState) => state.products.length;

export const selectProductsState = createFeatureSelector<ProductsState>('product');

export const selectProducts = createSelector(
    selectProductsState,
    (state) => state.products
);

export const selectProductsShowProductCode = createSelector(
    selectProductsState,
    (state) => state.showProdctCode
);

export const selectProductsErrorMessage = createSelector(
    selectProductsState,
    (state) => state.errorMessage
);

export const selectProductsLoading = createSelector(
    selectProductsState,
    (state) => state.loading
);

export const selectProductsCount = createSelector(
    selectProductsState,
    countOfProducts
);

export const selectProductsTotal = createSelector(
    selectProductsState,
    (state) => sumProducts(state.products)
);

export const { selectRouteParams } = getRouterSelectors();

// export const selectProductById = (id: number) => createSelector(
//     selectProductsState,
//     (state) => state.products.find((product) => product.id === id)
// );

export const selectProductById = createSelector(
    selectProducts,
    selectRouteParams,
    (products, {id}) => products.find((product) => product.id === parseInt(id))
);
