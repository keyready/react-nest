import { StateSchema } from 'app/providers/StoreProvider';

export const getProductData = (state: StateSchema) => state.product?.data;
