import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { google } from 'redux/userReducers';
import { setToken } from 'redux/userOperations';
import { CalculatorForm } from 'components';
import s from '../index.module.css';

const Home = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const user = JSON.parse(searchParams.get('user'));
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken && refreshToken) {
            setToken(accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            dispatch(google({ accessToken, refreshToken, user }));
        }
    }, [accessToken, refreshToken, dispatch, user]);

    return (
        <section className={s.container}>
            <CalculatorForm submit={false} />
        </section>
    );
};

export default Home;
