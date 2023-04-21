export { ProductCard } from './ui/Product/ProductCard';
export type { Product, ProductSchema } from './model/types/ProductSchema';
export { ProductActions, ProductReducer } from './model/slices/ProductSlice';
export { createProduct } from './model/services/createProduct';
export { updateProduct } from './model/services/updateProduct';
export {
    getProductData,
} from './model/selectors/getProductData';
