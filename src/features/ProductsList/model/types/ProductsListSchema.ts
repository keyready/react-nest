import { EntityState } from '@reduxjs/toolkit';
import { Product } from 'entities/Product';

export interface ProductsListSchema extends EntityState<Product> {
    isLoading: boolean;
    error?: string;
}
