import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_REFRESH_TOKEN } from 'shared/const';
import Cookies from 'js-cookie';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers: Headers) => {
            const token = Cookies.get(USER_REFRESH_TOKEN);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
    }),
});
