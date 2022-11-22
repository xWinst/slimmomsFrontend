import { useDispatch } from 'react-redux';
import { logIn } from 'redux/userOperations';
import s from '../index.module.css';
import { Container, Header } from 'components';

const Home = () => {
    const dispatch = useDispatch();

    const signin = () => {
        console.log('click');
        dispatch(logIn());
    };

    return (
        <>
            <section className={s.container}>
                HOME
                <button type="button" onClick={signin}>
                    Login
                </button>
            </section>
        </>
    );
};

export default Home;
