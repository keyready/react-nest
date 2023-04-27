/**
 * Встать!
 * (c) Димочка Поляков, 2:01, 24.04.2023
 */

import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Product, ProductCard, ProductCardSkeleton } from 'entities/Product';
import { VStack } from 'shared/UI/Stack';
import classes from './ProductsList.module.scss';

interface ProductsListProps {
    className?: string;
    products?: Product[];
    isLoading?: boolean;
}

export const ProductsList = memo((props: ProductsListProps) => {
    const { className, products, isLoading } = props;

    const getSkeletons = useCallback(() => new Array(3)
        .fill(0)
        .map((item, index) => (
            <ProductCardSkeleton key={index} />
        )), []);

    if (!isLoading && !products?.length) {
        return (
            <VStack
                className={classNames(classes.ProductsList, {}, [className])}
                max
                align="start"
                gap="16"
            >
                <h1>Список всех продуктов</h1>
                <h4>пока ничего нет...</h4>
            </VStack>
        );
    }

    return (
        <VStack
            className={classNames(classes.ProductsList, {}, [className])}
            max
            align="start"
            gap="16"
        >
            <h1>Список всех продуктов</h1>
            {products && !isLoading
                ? (
                    <>
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </>
                )
                : null}
            {isLoading && getSkeletons()}
        </VStack>
    );
});
