// import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { ProductState } from './product.reducer';
// import { Product } from '../model/product.model';

// export const selectProductState = createFeatureSelector<ProductState>('product');

// export const selectAllProducts = createSelector(
//   selectProductState,
//   (state: ProductState) => state.products
// );

// // take a product with the correct productId from the products array of product state in reducer
// export const selectProductById = (productId: string) => createSelector(
//   selectAllProducts,
//   (products: Product[] | null) => products ? products.find(product => product.productId === productId) : null
// );
