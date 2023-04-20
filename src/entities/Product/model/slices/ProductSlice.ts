import { createSlice } from '@reduxjs/toolkit';
import { ProductSchema } from '../types/ProductSchema';

const initialState: ProductSchema = {
    isLoading: false,
};

export const ProductSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: ProductActions } = ProductSlice;
export const { reducer: ProductReducer } = ProductSlice;
