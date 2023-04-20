import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, memo, useCallback, useState,
} from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProductActions } from '../../model/slices/ProductSlice';
import { updateProduct } from '../../model/services/updateProduct';
import {
    getProductData,
    getProductError,
    getProductForm,
    getProductIsLoading,
    getProductReadonly,
} from '../../model/selectors/getProductData';
import classes from './ProductCard.module.scss';
import { Product } from '../../model/types/ProductSchema';

interface ProductProps {
    className?: string;
    product: Product;
}

export const ProductCard = memo((props: ProductProps) => {
    const { className, product } = props;

    const dispatch = useAppDispatch();

    const readonly = useSelector(getProductReadonly);
    const data = useSelector(getProductData);
    const form = useSelector(getProductForm);
    const error = useSelector(getProductError);
    const isLoading = useSelector(getProductIsLoading);

    const readonlyHandler = useCallback(() => {
        dispatch(ProductActions.setReadonly(false));
    }, [dispatch]);

    const cancelChangesHandler = useCallback(() => {
        dispatch(ProductActions.cancelEdit());
    }, [dispatch]);

    const saveChangesHandler = useCallback(() => {
        dispatch(updateProduct());
    }, [dispatch]);

    const onChangeTitleHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        // dispatch(ProductActions.changeData({ ...form, name: e.target.value }));
    }, [dispatch, form]);

    const onChangePriceHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        // dispatch(ProductActions.changeData({ ...form, price: ~~e.target.value }));
    }, [dispatch, form]);

    return (
        <div className={classNames(classes.ProductCard, {}, [className])}>
            {readonly
                ? (
                    <HStack max justify="end">
                        <Button
                            variant="warning"
                            onClick={readonlyHandler}
                        >
                            Редактировать
                        </Button>
                    </HStack>
                )
                : (
                    <HStack max justify="end">
                        <Button
                            variant="success"
                            onClick={saveChangesHandler}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="danger"
                            onClick={cancelChangesHandler}
                        >
                            Отставить
                        </Button>
                    </HStack>
                )}
            <VStack
                max
                justify="start"
                align="center"
            >
                <HStack max gap="32">
                    <img
                        className={classes.image}
                        src={product.image}
                        alt={product.name}
                    />
                    <VStack max>
                        <Form.Group className="mb-3">
                            <Form.Control
                                className={classes.productTitle}
                                plaintext
                                readOnly={readonly}
                                onChange={onChangeTitleHandler}
                                defaultValue={product.name}
                            />
                            <Form.Control
                                className={classes.productTitle}
                                plaintext
                                readOnly={readonly}
                                onChange={onChangePriceHandler}
                                defaultValue={product.price}
                                type="number"
                            />
                        </Form.Group>
                    </VStack>
                </HStack>
                <p
                    className={classes.description}
                >
                    {product.description}
                </p>
            </VStack>
        </div>
    );
});
