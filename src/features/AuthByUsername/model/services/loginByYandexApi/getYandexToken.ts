import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { userActions, UserRoles } from 'entities/User';

interface YandexUser {
    firstname: string;
    login: string;
    gender: string;
    email: string;
    phone: string;
    avatar: string;
    id: string;
    access_token: string;
    refresh_token: string;
}

export const getYandexToken = createAsyncThunk<
    YandexUser,
    string,
    ThunkConfig<string>
>(
    'loginByYandexApi/getYandexToken',
    async (code, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const backendResponse = await extra.api.post<YandexUser>('/yandex_login', {
                code,
            });

            if (!backendResponse.data) throw new Error();

            const user = backendResponse.data;

            dispatch(userActions.setAuthData({
                firstname: user.firstname.split(' ')[0],
                lastname: user.firstname.split(' ')[1],
                image: user.avatar,
                _id: user.id,
                login: user.login,
                password: '',
                access_token: user.access_token,
                refresh_token: user.refresh_token,
            }));

            return backendResponse.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
