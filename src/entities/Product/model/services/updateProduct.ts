import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProductData } from '../selectors/getProductData';
import { Product } from '../types/ProductSchema';

export const updateProduct = createAsyncThunk<
    Product[],
    Product,
    ThunkConfig<string>
>(
    'products/updateProduct',
    async (form, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const product = getProductData(getState());

        try {
            const response = await extra.api.post<Product[]>(
                `/update_product/${product?.id}`,
                form,
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
