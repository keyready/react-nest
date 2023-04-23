/**
 Все, что связано с инстанс апи - урок 38.
 Там еще изменения в loginByUsername и многих других файлах.
 Посмотришь ес чо по коммиту
 */

import axios from 'axios';
import { USER_ACCESS_TOKEN } from 'shared/const';

export const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        const token = localStorage.getItem(USER_ACCESS_TOKEN) || '';
        console.log(token);
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
