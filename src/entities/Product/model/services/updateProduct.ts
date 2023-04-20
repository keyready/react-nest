import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProductForm } from '../selectors/getProductData';

export const updateProduct = createAsyncThunk<
    string,
    void,
    ThunkConfig<string>
>(
    'products/updateProduct',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const form = getProductForm(getState());

        try {
            const response = await extra.api.post<string>(
                `/edit_product/${form?.id}`,
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
