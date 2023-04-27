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
import { useEffect, useState } from 'react';
import { Map } from 'widgets/Map';
import { VStack } from 'shared/UI/Stack';
import { MSlider } from 'shared/UI/Slider';
import { getYandexToken } from 'features/AuthByUsername';
import { useNavigate } from 'react-router';

const reducers: ReducersList = {
    productsList: ProductsListReducers,
};

interface IUser {
    firstname?: string;
    login?: string;
    gender?: string;
    email?: string;
    phone?: string;
}

const MainPage = () => {
    const dispatch = useAppDispatch();
    const userData = useSelector(getUserAuthData);
    const nav = useNavigate();

    useEffect(() => {
        if (userData) dispatch(fetchProducts());
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code && !userData) {
            dispatch(getYandexToken(code));
            nav('/');
        }
    }, [dispatch, nav, userData]);

    const products = useSelector(getProducts.selectAll);
    const isLoading = useSelector(getProductsListIsLoading);

    if (!userData) {
        return (
            <Page>
                <VStack gap="32">
                    {/* <MSlider /> */}
                    <Map />
                </VStack>
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
