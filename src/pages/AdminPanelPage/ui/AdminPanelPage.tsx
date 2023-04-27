import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { FormEvent, memo, useCallback } from 'react';
import { registerUser } from 'entities/User';
import { createProduct, ProductReducer } from 'entities/Product';
import { Button, Form, InputGroup } from 'react-bootstrap';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ProductsListReducers } from 'features/ProductsList';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import classes from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
    className?: string;
}

const reducers: ReducersList = {
    product: ProductReducer,
    productsList: ProductsListReducers,
};

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
    const {
        className,
    } = props;

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
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.AdminPanelPage, {}, [className])}>
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
            </Page>
        </DynamicModuleLoader>
    );
});

export default AdminPanelPage;
