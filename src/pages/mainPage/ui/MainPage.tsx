import { Page } from 'widgets/Page/Page';
import { Button, Form, InputGroup } from 'react-bootstrap';
import {
    ChangeEvent, FormEvent, useCallback, useEffect, useState,
} from 'react';
import { VStack } from 'shared/UI/Stack';
import {
    createProduct,
    ProductCard,
    ProductReducer,
} from 'entities/Product';
import { Loader } from 'shared/UI/Loader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData, registerUser } from 'entities/User';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../model/services/fetchProducts';
import { getProductsIsLoading } from '../model/selectors/getProducts';
import classes from './MainPage.module.scss';
import { getProducts, MainPageReducers } from '../model/slice/MainPageSlice';

const reducers: ReducersList = {
    product: ProductReducer,
    mainPage: MainPageReducers,
};

const MainPage = () => {
    const dispatch = useAppDispatch();
    const userData = useSelector(getUserAuthData);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch, userData]);

    const products = useSelector(getProducts.selectAll);
    const isLoading = useSelector(getProductsIsLoading);

    const handleSubmitUser = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        event.currentTarget.reset();

        const result = await dispatch(registerUser(formData));
        // @ts-ignore
        if (result.meta.requestStatus === 'fulfilled') {
            alert('Регистрация успешна');
        } else alert('Какая-то ошибка');
    }, [dispatch]);
    const handleSubmitProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        dispatch(createProduct(formData));
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page>
                <h1>добавить пользователя</h1>
                <Form
                    encType="multipart/form-data"
                    onSubmit={handleSubmitUser}
                >
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Имя</InputGroup.Text>
                        <Form.Control
                            name="firstname"
                            placeholder="Имя"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Фамилия</InputGroup.Text>
                        <Form.Control
                            name="lastname"
                            placeholder="Фамилия"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Логин</InputGroup.Text>
                        <Form.Control
                            name="login"
                            placeholder="Логин"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Пароль</InputGroup.Text>
                        <Form.Control
                            name="password"
                            placeholder="Пароль"
                        />
                    </InputGroup>
                    <Form.Group>
                        <Form.Label>Загрузите аватар</Form.Label>
                        <Form.Control
                            name="image"
                            id="image"
                            type="file"
                            accept=".png,.jpg,.jpeg"
                        />
                    </Form.Group>
                    <Button type="submit">Отправить</Button>
                </Form>
                <hr />
                <br />
                <br />
                <br />

                <h1>добавить продукт</h1>
                <Form
                    encType="multipart/form-data"
                    onSubmit={handleSubmitProduct}
                >
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Название</InputGroup.Text>
                        <Form.Control
                            name="name"
                            placeholder="Название"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Описание</InputGroup.Text>
                        <Form.Control
                            name="description"
                            placeholder="Описание"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Стоимость</InputGroup.Text>
                        <Form.Control
                            type="number"
                            name="price"
                            placeholder="Стоимость"
                        />
                    </InputGroup>
                    <Form.Group>
                        <Form.Label>Загрузите фото</Form.Label>
                        <Form.Control
                            name="image"
                            id="image"
                            type="file"
                            accept=".png,.jpg,.jpeg"
                        />
                    </Form.Group>
                    <Button type="submit">Отправить</Button>
                </Form>
                <hr />
                <br />
                <br />
                <br />

                <h1>список всех продуктов</h1>
                <VStack max align="start" gap="16" className={classes.productList}>
                    {products && !isLoading
                        ? products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))
                        : 'Продуктов пока нет'}
                    {isLoading && (
                        <Loader />
                    )}
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default MainPage;
