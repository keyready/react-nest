import { Page } from 'widgets/Page/Page';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FormEvent, useCallback } from 'react';
import { VStack } from 'shared/UI/Stack';
import { createProduct, ProductCard } from 'entities/Product';
import { Loader } from 'shared/UI/Loader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { registerUser } from 'entities/User';
import { useGetProducts } from '../api/productsApi';
import classes from './MainPage.module.scss';

const MainPage = () => {
    const { data: products, isLoading } = useGetProducts(1);
    const dispatch = useAppDispatch();

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
                            product={product}
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
