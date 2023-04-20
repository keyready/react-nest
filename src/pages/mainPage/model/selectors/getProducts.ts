import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsIsLoading = (state: StateSchema) => state.mainPage?.isLoading;
export const getProductsError = (state: StateSchema) => state.mainPage?.error;
