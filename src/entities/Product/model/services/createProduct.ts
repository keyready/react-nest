import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Product } from '../types/ProductSchema';

export const createProduct = createAsyncThunk<
    Product[],
    any,
    ThunkConfig<string>
>(
    'products/createProduct',
    async (newProduct, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<Product[]>(
                '/create_product',
                newProduct,
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
