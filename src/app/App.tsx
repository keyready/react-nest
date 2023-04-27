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
import Cookies from 'js-cookie';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    // проверить, был ли авторизован пользователь перед закрытием вкладки
    useEffect(() => {
        dispatch(userActions.initAuthData());

        const refreshToken = Cookies.get(USER_REFRESH_TOKEN);
        if (refreshToken) {
            dispatch(checkAuth(refreshToken));
        }
    }, [dispatch]);

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
