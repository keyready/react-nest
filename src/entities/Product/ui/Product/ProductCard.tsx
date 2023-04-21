import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Form } from 'react-bootstrap';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateProduct } from '../../model/services/updateProduct';
import { Product } from '../../model/types/ProductSchema';
import classes from './ProductCard.module.scss';
import { ProductCardHeader } from './ProductCardHeader/ProductCardHeader';

interface ProductProps {
    className?: string;
    product: Product;
}

export const ProductCard = memo((props: ProductProps) => {
    const { className, product } = props;

    const dispatch = useAppDispatch();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [readonly, setReadonly] = useState<boolean>(true);
    const [form, setForm] = useState<Product>(product);

    const readonlyHandler = useCallback(() => {
        setReadonly(false);
    }, []);

    const cancelChangesHandler = useCallback(() => {
        setReadonly(true);
        setForm(product);
    }, [product]);

    const saveChangesHandler = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const result = await dispatch(updateProduct({ form: formData, id: form.id }));
        setReadonly(true);

        if (result.meta.requestStatus === 'fulfilled') {
            //
        } else {
            alert(`Ошибка при обновлении продукта с id = ${product.id}`);
        }
        setForm(product);
    }, [dispatch, form, product]);

    const onChangeTitleHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, name: e.target.value });
    }, [form]);
    const onChangeDescriptionHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { current: textArea } = textareaRef;
        if (textArea) {
            textArea.style.height = 'auto';
            textArea.style.height = `${textArea.scrollHeight}px`;
        }

        setForm({ ...form, description: e.target.value });
    }, [form]);
    const onChangePriceHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, price: ~~e.target.value });
    }, [form]);

    return (
        <Form
            className={classNames(classes.ProductCard, {}, [className])}
            onSubmit={saveChangesHandler}
            encType="multipart/form-data"
        >
            <ProductCardHeader
                readonlyHandler={readonlyHandler}
                cancelChangesHandler={cancelChangesHandler}
                readonly={readonly}
            />
            <VStack
                max
                justify="start"
                align="center"
            >
                <HStack max gap="32">
                    <div>
                        <label
                            htmlFor="imageInput"
                            style={{ pointerEvents: readonly ? 'none' : 'auto' }}
                        >
                            <img
                                className={classes.image}
                                src={form.image}
                                alt={form.name}
                            />
                        </label>
                        <input
                            readOnly={readonly}
                            name="image"
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>
                    <VStack max>
                        <Form.Control
                            className={classes.productTitle}
                            plaintext={readonly}
                            readOnly={readonly}
                            onChange={onChangeTitleHandler}
                            defaultValue={form.name}
                            value={form.name}
                            name="name"
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
                                name="price"
                            />
                        </HStack>
                    </VStack>
                </HStack>
                <Form.Control
                    as="textarea"
                    style={{ resize: 'none', height: 'auto' }}
                    ref={textareaRef}
                    className={classes.productDescription}
                    plaintext={readonly}
                    readOnly={readonly}
                    onChange={onChangeDescriptionHandler}
                    defaultValue={form.description}
                    value={form.description}
                    name="description"
                />
            </VStack>
        </Form>
    );
});
