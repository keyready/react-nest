import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProduct } from '../services/updateProduct';
import { createProduct } from '../services/createProduct';
import { Product, ProductSchema } from '../types/ProductSchema';

const initialState: ProductSchema = {
    isLoading: false,
    readonly: true,
};

export const ProductSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.form = state.data;
        },
        changeData: (state, action: PayloadAction<Product>) => {
            state.form = {
                ...state.data,
                ...state.form,
                ...action.payload,
            };
        },
    },
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
            })

            .addCase(updateProduct.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProductActions } = ProductSlice;
export const { reducer: ProductReducer } = ProductSlice;
