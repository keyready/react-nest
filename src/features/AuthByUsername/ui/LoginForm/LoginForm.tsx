import { classNames } from 'shared/lib/classNames/classNames';
import { Alert, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import proxy from 'http-proxy-middleware';
import { ChangeEvent, memo, useCallback } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from 'shared/UI/Stack';
import { useNavigate } from 'react-router';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import classes from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const {
        className,
        onSuccess,
    } = props;

    const onUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);
    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        window.location.reload();

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [dispatch, onSuccess, password, username]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <form
                className={classNames(classes.LoginForm, {}, [className])}
            >
                {error && (
                    <Alert
                        variant="danger"
                        className={classes.loginError}
                    >
                        {error}
                    </Alert>
                )}
                <Form.Control
                    autoFocus
                    placeholder="Введите логин"
                    value={username}
                    onChange={onUsernameChange}
                    type="text"
                />
                <Form.Control
                    placeholder="Введите пароль"
                    value={password}
                    onChange={onPasswordChange}
                    type="password"
                />
                <VStack gap="16">
                    <Button
                        variant="primary"
                        className={classes.loginBtn}
                        onClick={onLoginClick}
                        disabled={isLoading}
                        type="submit"
                    >
                        Войти
                    </Button>
                    <Button
                        variant="warning"
                        className={classes.loginBtn}
                        disabled={isLoading}
                        type="button"
                    >
                        <a
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href="https://oauth.yandex.ru/authorize?response_type=code&client_id=c1688919452843349161a0207d2ac149"
                        >
                            Войти с Яндекс.ID
                        </a>
                    </Button>
                </VStack>
            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
