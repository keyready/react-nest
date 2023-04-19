import { Page } from 'widgets/Page/Page';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FormEvent, useEffect, useState } from 'react';
import { Card } from 'shared/UI/Card/Card';
import { HStack } from 'shared/UI/Stack';
import classes from './MainPage.module.scss';

interface IProduct {
    name?: string;
    price?: number;
    description?: string;
    image?: string
}

const MainPage = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch('http://localhost:1337/products')
            .then((res) => res.json())
            .then((res) => setProducts(res));
    }, [products]);

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

        fetch('http://localhost:1337/create_product', {
            method: 'POST',
            body: formData,
        });
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

            <h1>Список всех продуктов</h1>
            {products.map((product) => (
                <Card>
                    <HStack max>
                        <h2>{product.name}</h2>
                        <img className={classes.image} src={product.image} alt="" />
                    </HStack>
                    <p>{product.description}</p>
                    <p>
                        Стоимость:
                        {product.price}
                    </p>
                </Card>
            ))}
        </Page>
    );
};

export default MainPage;
