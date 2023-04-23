import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsListIsLoading = (state: StateSchema) => state.productsList?.isLoading;
export const getProductsListError = (state: StateSchema) => state.productsList?.error;
