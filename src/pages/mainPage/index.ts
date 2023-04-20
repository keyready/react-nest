import { MainPageLazy } from './ui/MainPage.lazy';

export {
    MainPageLazy as MainPage,
};

export type {
    MainPageSchema,
} from './model/types/MainPage';

export {
    MainPageActions,
    MainPageReducers,
} from './model/slice/MainPageSlice';

export {
    getProductsIsLoading,
    getProductsError,
} from './model/selectors/getProducts';
