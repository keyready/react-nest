import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Product } from '../types/ProductSchema';

interface UpdateProductProps {
    form?: FormData;
    id?: number
}

export const updateProduct = createAsyncThunk<
    Product[],
    UpdateProductProps,
    ThunkConfig<string>
>(
    'products/updateProduct',
    async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        const { form, id } = props;

        try {
            const response = await extra.api.post<Product[]>(
                `/update_product/${id}`,
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
