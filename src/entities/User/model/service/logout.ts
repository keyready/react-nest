import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { disposables } from '@headlessui/react/dist/utils/disposables';
import { getProducts, productAdapter } from 'features/ProductsList/model/slices/ProductsListSlice';

export const logout = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>(
    'user/logout',
    async (token, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;

        try {
            const response = await extra.api.post(
                '/logout',
                { refresh_token: token },
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
