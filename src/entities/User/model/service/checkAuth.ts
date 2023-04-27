import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from 'shared/const';
import Cookies from 'js-cookie';
import { userActions } from '../slice/userSlice';
import { User } from '../types/user';

export const checkAuth = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
>(
    'user/checkAuth',
    async (token, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;

        try {
            const response = await extra.api.post<User>(
                '/refresh',
                { refresh_token: token },
            );

            if (!response.data) {
                throw new Error();
            }

            if (response.data.refresh_token && response.data.access_token) {
                Cookies.set(
                    USER_REFRESH_TOKEN,
                    response.data.refresh_token,
                );
                Cookies.set(
                    USER_ACCESS_TOKEN,
                    response.data.access_token,
                );
            }
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
