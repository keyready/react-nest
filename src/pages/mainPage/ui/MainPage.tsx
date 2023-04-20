import { Page } from 'widgets/Page/Page';
import {
    InputGroup, Form, Button, Col,
} from 'react-bootstrap';
import {
    FormEvent, useCallback, useEffect, useState,
} from 'react';
import { Card } from 'shared/UI/Card/Card';
import { HStack, VStack } from 'shared/UI/Stack';
import { createProduct, ProductCard } from 'entities/Product';
import { useGetProducts } from 'pages/mainPage/api/productsApi';
import { Loader } from 'shared/UI/Loader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import classes from './MainPage.module.scss';

interface IProduct {
    name?: string;
    price?: number;
    description?: string;
    image?: string
}

const MainPage = () => {
    const { data: products, isLoading } = useGetProducts(1);
    const dispatch = useAppDispatch();

    const handleSubmitUser = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        fetch('http://localhost:1337/register', {
            method: 'POST',
            body: formData,
        });
    };
    const handleSubmitProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        dispatch(createProduct(formData));
    };
    const handleSubmitLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        fetch('http://localhost:1337/login', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => alert(res));
    }, []);

    return (
        <Page>
            <h1>Авторизация</h1>
            <Form
                encType="multipart/form-data"
                onSubmit={handleSubmitLogin}
            >
                <InputGroup className="mb-3">
                    <InputGroup.Text>Логин</InputGroup.Text>
                    <Form.Control
                        name="login"
                        placeholder="Логин"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Пароль</InputGroup.Text>
                    <Form.Control
                        name="password"
                        placeholder="Пароль"
                    />
                </InputGroup>
                <Button type="submit">Войти</Button>
            </Form>
            <hr />
            <br />
            <br />
            <br />

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
                {products
                    ? products.map((product) => (
                        // {new Array(5).fill(0).map((product) => (
                        <ProductCard
                            product={{
                                name: 'Название',
                                description: 'Описание продукта',
                                price: 1000,
                                image: 'file_path',
                            }}
                        />
                    ))
                    : 'Продуктов пока нет'}
                {isLoading && (
                    <Loader />
                )}
            </VStack>
        </Page>
    );
};

export default MainPage;
