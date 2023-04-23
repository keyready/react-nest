import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, FormEvent, memo, useCallback, useRef, useState,
} from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Form } from 'react-bootstrap';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { isUserAdmin } from 'entities/User';
import { deleteProduct } from '../../model/services/deleteProduct';
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
    const canEdit = useSelector(isUserAdmin);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [imageUrl, setImageUrl] = useState('');

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
    }

    const [readonly, setReadonly] = useState<boolean>(true);
    const [form, setForm] = useState<Product>(product);

    const readonlyHandler = useCallback(() => {
        setReadonly(false);
    }, []);

    const cancelChangesHandler = useCallback(() => {
        setReadonly(true);
        setForm(product);
        URL.revokeObjectURL(imageUrl);
        setImageUrl('');
    }, [imageUrl, product]);

    const saveChangesHandler = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const result = await dispatch(updateProduct({ form: formData, _id: form._id }));
        setReadonly(true);

        if (result.meta.requestStatus === 'fulfilled') {
            //
        } else {
            alert(`Ошибка при обновлении продукта с id = ${product._id}`);
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

    const deleteProductHandler = useCallback(() => {
        dispatch(deleteProduct(product._id));
    }, [dispatch, product._id]);

    return (
        <Form
            className={classNames(classes.ProductCard, {}, [className])}
            onSubmit={saveChangesHandler}
            encType="multipart/form-data"
        >
            {canEdit && (
                <ProductCardHeader
                    readonlyHandler={readonlyHandler}
                    cancelChangesHandler={cancelChangesHandler}
                    deleteProductHandler={deleteProductHandler}
                    readonly={readonly}
                />
            )}

            <VStack
                max
                justify="start"
                align="center"
            >
                <HStack max gap="32">
                    <div>
                        <label
                            htmlFor={`imageInput${product._id}`}
                            style={{
                                pointerEvents: readonly ? 'none' : 'auto',
                                cursor: readonly ? 'auto' : 'pointer',
                            }}
                        >
                            <img
                                className={classNames(classes.image, {
                                    [classes.canReplaceImage]: !readonly,
                                })}
                                src={imageUrl || form.image}
                                alt={form.name}
                            />
                        </label>
                        <input
                            readOnly={readonly}
                            name="image"
                            id={`imageInput${product._id}`}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <VStack max>
                        <Form.Control
                            className={classes.productTitle}
                            plaintext={readonly}
                            readOnly={readonly}
                            onChange={onChangeTitleHandler}
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
                    value={form.description}
                    name="description"
                />
            </VStack>
        </Form>
    );
});
