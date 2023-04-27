import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classes from './ProductCard.module.scss';

export const ProductCardSkeleton = memo(() => (
    <VStack
        className={classNames(classes.ProductCard)}
        max
        gap="16"
        // justify="start"
        // align="center"
    >
        <HStack max gap="8">
            <div>
                <Skeleton width={150} height={150} border="20%" />
            </div>
            <VStack max gap="8">
                <Skeleton width="100%" height={40} border="10px" />
                <HStack max align="center">
                    <div className={classes.productDescription}>Стоимость: </div>
                    <Skeleton width="100%" height={40} border="10px" />
                </HStack>
            </VStack>
        </HStack>
        <Skeleton width="100%" height={100} border="10px" />
    </VStack>
));
