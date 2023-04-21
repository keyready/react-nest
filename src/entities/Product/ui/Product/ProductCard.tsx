import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, memo, useCallback, useState,
} from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateProduct } from '../../model/services/updateProduct';
import { Product } from '../../model/types/ProductSchema';
import classes from './ProductCard.module.scss';

interface ProductProps {
    className?: string;
    product: Product;
}

export const ProductCard = memo((props: ProductProps) => {
    const { className, product } = props;

    const dispatch = useAppDispatch();

    const [readonly, setReadonly] = useState<boolean>(true);
    const [form, setForm] = useState<Product>(product);

    const readonlyHandler = useCallback(() => {
        setReadonly(false);
    }, []);

    const cancelChangesHandler = useCallback(() => {
        setReadonly(true);
        setForm(product);
    }, [product]);

    const saveChangesHandler = useCallback(async () => {
        const result = await dispatch(updateProduct(form));
        setReadonly(true);

        if (result.meta.requestStatus === 'fulfilled') {
            alert(`Данные продукта с id = ${form.id} успешно обновлены`);
        } else {
            alert(`Ошибка при обновлении продукта с id = ${form.id}`);
        }
        setForm(product);
    }, [dispatch, form, product]);

    const onChangeTitleHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, name: e.target.value });
    }, [form]);
    const onChangeDescriptionHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, description: e.target.value });
    }, [form]);
    const onChangePriceHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line no-bitwise
        setForm({ ...form, price: ~~e.target.value });
    }, [form]);

    return (
        <Form
            className={classNames(classes.ProductCard, {}, [className])}
            // onSubmit={saveChangesHandler}
        >
            {readonly
                ? (
                    <HStack max justify="end">
                        <Button
                            variant="warning"
                            onClick={readonlyHandler}
                            type="button"
                        >
                            Редактировать
                        </Button>
                    </HStack>
                )
                : (
                    <HStack max justify="end">
                        <Button
                            variant="success"
                            type="button"
                            onClick={saveChangesHandler}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="danger"
                            onClick={cancelChangesHandler}
                            type="button"
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
                        src={form.image}
                        alt={form.name}
                    />
                    <VStack max>
                        <Form.Control
                            className={classes.productTitle}
                            plaintext={readonly}
                            readOnly={readonly}
                            onChange={onChangeTitleHandler}
                            defaultValue={form.name}
                            value={form.name}
                        />
                        <HStack max align="center">
                            <div className={classes.productDescription}>Стоимость: </div>
                            <Form.Control
                                className={classes.productDescription}
                                plaintext={readonly}
                                readOnly={readonly}
                                onChange={onChangePriceHandler}
                                defaultValue={form.price}
                                value={form.price}
                                type="number"
                            />
                        </HStack>
                    </VStack>
                </HStack>
                <Form.Control
                    className={classes.productDescription}
                    plaintext={readonly}
                    readOnly={readonly}
                    onChange={onChangeDescriptionHandler}
                    defaultValue={form.description}
                    value={form.description}
                />
            </VStack>
        </Form>
    );
});
