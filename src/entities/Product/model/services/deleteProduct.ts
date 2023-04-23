import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Product } from '../types/ProductSchema';

export const deleteProduct = createAsyncThunk<
    Product[],
    string,
    ThunkConfig<string>
>(
    'products/deleteProduct',
    async (id, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<Product[]>(
                '/delete_product',
                { _id: id },
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error deleting product');
        }
    },
);
