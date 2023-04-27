import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { deleteProduct, Product, updateProduct } from 'entities/Product';
import { ProductsListSchema } from '../types/ProductsListSchema';
import { fetchProducts } from '../services/fetchProducts';

export const productAdapter = createEntityAdapter<Product>({
    selectId: (product) => product._id,
});

export const getProducts = productAdapter.getSelectors<StateSchema>(
    (state) => state.productsList || productAdapter.getInitialState(),
);

const ProductsList = createSlice({
    name: 'productListSlice',
    initialState: productAdapter.getInitialState<ProductsListSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {
        logout: (state) => {
            productAdapter.removeAll(state);
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (
                state,
                action: PayloadAction<Product[]>,
            ) => {
                state.isLoading = false;
                productAdapter.setAll(state, action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateProduct.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoading = false;
                productAdapter.setAll(state, action.payload);
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoading = false;
                productAdapter.setAll(state, action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const {
    reducer: ProductsListReducers,
    actions: ProductsListActions,
} = ProductsList;
