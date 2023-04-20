import { StateSchema } from 'app/providers/StoreProvider';

export const getProductData = (state: StateSchema) => state.product?.data;
export const getProductForm = (state: StateSchema) => state.product?.form;
export const getProductError = (state: StateSchema) => state.product?.error;
export const getProductIsLoading = (state: StateSchema) => state.product?.isLoading;
export const getProductReadonly = (state: StateSchema) => state.product?.readonly;
