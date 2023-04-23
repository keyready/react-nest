import { Page } from 'widgets/Page/Page';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import {
    fetchProducts,
    getProducts,
    getProductsListIsLoading,
    ProductsList,
    ProductsListReducers,
} from 'features/ProductsList';
import { useEffect } from 'react';

const reducers: ReducersList = {
    productsList: ProductsListReducers,
};

const MainPage = () => {
    const dispatch = useAppDispatch();
    const userData = useSelector(getUserAuthData);

    useEffect(() => {
        if (userData) dispatch(fetchProducts());
    }, [dispatch, userData]);

    const products = useSelector(getProducts.selectAll);
    const isLoading = useSelector(getProductsListIsLoading);

    if (!userData) {
        return (
            <Page>
                <h1>Список всех продуктов</h1>
                <h4>для начала авторизуйтесь</h4>
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page>
                <ProductsList
                    products={products}
                    isLoading={isLoading}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default MainPage;
