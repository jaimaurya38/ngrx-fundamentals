import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../product.model";

export const ProductsPageActions = createActionGroup({
    source: 'Product Page',
    events: {
        'Toggle Show Product Code': emptyProps(),
        'Load Products': emptyProps(),
        'Add Product': props<{ products: Product }>(),
        'Update Product': props<{ products: Product }>(),
        'Delete Product': props<{ id: number }>(),
    }
})

export const ProductsAPIActions = createActionGroup({
    source: 'Product API',
    events: {
        'Products Load Success': props<{ products: Product[] }>(),
        'Products Load Fail': props<{ message: string }>(),
        'Products Added Success': props<{ products: Product }>(),
        'Products Added Fail': props<{ message: string }>(),
        'Products Updated Success': props<{ products: Product }>(),
        'Products Updated Fail': props<{ message: string }>(),
        'Products Deleted Success': props<{ products: Product }>(),
        'Products Deleted Fail': props<{ message: string }>()
    }
})