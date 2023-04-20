import { rtkApi } from 'shared/api/rtkApi';
import { Product } from 'entities/Product';

const productsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<Product[], number>({
            query: () => ({
                url: '/products',
            }),
        }),
    }),
});

export const useGetProducts = productsApi.useGetProductsQuery;
