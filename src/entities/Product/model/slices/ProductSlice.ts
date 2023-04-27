import { createSlice } from '@reduxjs/toolkit';
import { createProduct } from '../services/createProduct';
import { ProductSchema } from '../types/ProductSchema';

const initialState: ProductSchema = {
    isLoading: false,
};

export const ProductSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProductActions } = ProductSlice;
export const { reducer: ProductReducer } = ProductSlice;
