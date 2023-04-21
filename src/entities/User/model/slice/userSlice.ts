import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from 'shared/const';
import { logout } from '../service/logout';
import { checkAuth } from '../service/checkAuth';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
    _authorized: false,
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            // при авторизации записать данные в стейт и в локал сторадж
            localStorage.setItem(USER_REFRESH_TOKEN, action.payload.refresh_token);
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            // проверить, авторизован ли пользователь (после закрытия и открытия приложения)
            const user = localStorage.getItem(USER_REFRESH_TOKEN);
            if (user) {
                state._authorized = true;
            }
            state._inited = true;
        },
        logout: (state) => {
            // выход
            localStorage.removeItem(USER_ACCESS_TOKEN);
            localStorage.removeItem(USER_REFRESH_TOKEN);
            logout(USER_REFRESH_TOKEN);
            state.authData = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.authData = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
