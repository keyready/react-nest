import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import Cookies from 'js-cookie';
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from 'shared/const';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<User>(
                '/login',
                { login: authData.username, password: authData.password },
            );

            if (!response.data) {
                throw new Error();
            }

            Cookies.set(USER_REFRESH_TOKEN, response.data.refresh_token || '');
            Cookies.set(USER_ACCESS_TOKEN, response.data.access_token || '');
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
