import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Product, updateProduct } from 'entities/Product';
import { fetchProducts } from '../services/fetchProducts';
import { MainPageSchema } from '../types/MainPage';

const productAdapter = createEntityAdapter<Product>({
    selectId: (product) => product._id,
});

export const getProducts = productAdapter.getSelectors<StateSchema>(
    (state) => state.mainPage || productAdapter.getInitialState(),
);

const MainPageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: productAdapter.getInitialState<MainPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {
    },
    extraReducers: ((builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (
                state,
                action,
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
            });
    }),
});

export const {
    reducer: MainPageReducers,
    actions: MainPageActions,
} = MainPageSlice;
