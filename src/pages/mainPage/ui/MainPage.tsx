import { Page } from 'widgets/Page/Page';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FormEvent, useEffect } from 'react';

const MainPage = () => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        fetch('http://localhost:1337/register', {
            method: 'POST',
            body: formData,
        });
    };

    return (
        <Page>
            <Form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
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
                        name="avatar"
                        id="avatar"
                        type="file"
                    />
                </Form.Group>
                <Button type="submit">Отправить</Button>
            </Form>
        </Page>
    );
};

export default MainPage;
