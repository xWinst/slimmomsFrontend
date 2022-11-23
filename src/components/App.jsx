import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header, Loader, PrivateRoute, RestrictedRoute, Container } from 'components';

const Home = lazy(() => import('pages/Home/Home'));
const Login = lazy(() => import('pages/Login/Login'));
const Register = lazy(() => import('pages/Register/Register'));
const Diary = lazy(() => import('pages/Diary/Diary'));
const AddInDiary = lazy(() => import('pages/Diary/Input/AddInDiary'));
const Calculator = lazy(() => import('pages/Calculator/Calculator'));
const PageNotFound = lazy(() => import('pages/PageNotFound/PageNotFound'));

export const App = () => {
    const isLoading = useSelector(state => state.user.isLoading);

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
                            <Route path="addindiary" element={<AddInDiary />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </main>
        </Container>
    );
};
