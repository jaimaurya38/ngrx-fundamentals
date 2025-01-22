import { createAction, createReducer, on } from "@ngrx/store";

export interface ProductsState {
    showProdctCode: boolean;
}

const initialSate: ProductsState = {
    showProdctCode: true
}

export const productReducer = createReducer(
    initialSate,
    on(createAction('[Product Page] Toggle show Product code'), (state) => ({
        ...state,
        showProdctCode: !state.showProdctCode
    }))
    // ons(
    //     createAction('', (state) => ({ state })),
    //     createAction('', (state) => ({ state }))
    // )
)