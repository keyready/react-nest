import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User } from '../types/user';

export const registerUser = createAsyncThunk<
    User,
    any,
    ThunkConfig<string>
>(
    'user/registerUser',
    async (registerData, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<User>(
                '/register',
                registerData,
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
