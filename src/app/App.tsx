import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/AppRouter';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthorized, getUserInited, userActions,
} from 'entities/User';
import { checkAuth } from 'entities/User/model/service/checkAuth';
import { USER_REFRESH_TOKEN } from 'shared/const';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);
    const authorized = useSelector(getUserAuthorized);

    // проверить, был ли авторизован пользователь перед закрытием вкладки
    useEffect(() => {
        dispatch(userActions.initAuthData());

        const refreshToken = localStorage.getItem(USER_REFRESH_TOKEN) || '';
        if (authorized && refreshToken) {
            dispatch(checkAuth(refreshToken));
        }
    }, [dispatch, authorized]);

    return (
        <div
            className={classNames('app', {}, [theme])}
        >
            <Suspense fallback="">
                <Navbar />
                <div className="page">
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};
