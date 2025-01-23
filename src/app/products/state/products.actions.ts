import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../product.model";

export const ProductsPageActions = createActionGroup({
    source: 'Product Page',
    events: {
        'Toggle Show Product Code': emptyProps(),
        'Load Products': emptyProps(),
        'Add Product': props<{ product: Product }>(),
        'Update Product': props<{ product: Product }>(),
        'Delete Product': props<{ id: number }>(),
    }
})

export const ProductsAPIActions = createActionGroup({
    source: 'Product API',
    events: {
        'Products Load Success': props<{ products: Product[] }>(),
        'Products Load Fail': props<{ message: string }>(),
        'Products Added Success': props<{ product: Product }>(),
        'Products Added Fail': props<{ message: string }>(),
        'Products Updated Success': props<{ product: Product }>(),
        'Products Updated Fail': props<{ message: string }>(),
        'Products Deleted Success': props<{ id: number }>(),
        'Products Deleted Fail': props<{ message: string }>()
    }
})