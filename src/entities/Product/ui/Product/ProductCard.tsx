import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import classes from './ProductCard.module.scss';
import { Product } from '../../model/types/ProductSchema';

interface ProductProps {
    className?: string;
    product: Product;
}

export const ProductCard = memo((props: ProductProps) => {
    const { className, product } = props;

    return (
        <div className={classNames(classes.ProductCard, {}, [className])}>
            <VStack max justify="start" align="center">
                <HStack max justify="between" align="center">
                    <img
                        className={classes.image}
                        src={product.image}
                        alt={product.name}
                    />
                    <h2
                        className={classes.productTitle}
                    >
                        {product.name}
                    </h2>
                </HStack>
                <p
                    className={classes.description}
                >
                    {product.description}
                </p>
                <p
                    className={classes.price}
                >
                    Стоимость:
                    {product.price}
                </p>
            </VStack>
        </div>
    );
});
