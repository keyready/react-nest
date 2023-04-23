export { ProductsList } from './ui/ProductsList/ProductsList';
export type { ProductsListSchema } from './model/types/ProductsListSchema';

export {
    ProductsListActions,
    ProductsListReducers,
    productAdapter,
    getProducts,
} from './model/slices/ProductsListSlice';

export {
    fetchProducts,
} from './model/services/fetchProducts';

export {
    getProductsListIsLoading,
    getProductsListError,
} from './model/selectors/getProducts';
