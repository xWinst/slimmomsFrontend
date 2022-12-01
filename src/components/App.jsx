import { Suspense, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { refresh } from 'redux/userOperations';
import { getAllProducts } from 'redux/productOperation';
import { chooseDate } from 'redux/productReducers';

import {
    Header,
    Loader,
    PrivateRoute,
    RestrictedRoute,
    Container,
} from 'components';

const Home = lazy(() => import('pages/Home/Home'));
const Login = lazy(() => import('pages/Login/Login'));
const Register = lazy(() => import('pages/Register/Register'));
const Diary = lazy(() => import('pages/Diary/Diary'));
const Calculator = lazy(() => import('pages/Calculator/Calculator'));
const PageNotFound = lazy(() => import('pages/PageNotFound/PageNotFound'));

const getDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return day + '-' + month + '-' + year;
};

export const App = () => {
    const [hasRefresh, setHasRefresh] = useState(false);
    const isLoading = useSelector(state => state.user.isLoading);
    const allProducts = useSelector(state => state.product.allProducts);
    const date = useSelector(state => state.product.date);
    const dispatch = useDispatch();

    if (!allProducts) dispatch(getAllProducts());
    if (!date) {
        const newDate = getDate(new Date());
        dispatch(chooseDate(newDate));
    }
    if (!hasRefresh) {
        dispatch(refresh());
        setHasRefresh(true);
    }

    return isLoading ? (
        <Loader />
    ) : (
        <Container>
            <Header />
            <main className="main">
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route element={<RestrictedRoute />}>
                            <Route path="/" element={<Home />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                        </Route>
                        <Route element={<PrivateRoute />}>
                            <Route path="calculator" element={<Calculator />} />
                            <Route path="diary" element={<Diary />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </main>
        </Container>
    );
};
