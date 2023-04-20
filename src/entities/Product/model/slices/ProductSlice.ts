import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductSchema } from '../types/ProductSchema';

const initialState: ProductSchema = {
    
};

export const ProductSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
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