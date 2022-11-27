import { CalculatorForm } from 'components';
import s from '../index.module.css';

const Home = () => {
    return (
        <section className={s.container}>
            <CalculatorForm submit={false} />
        </section>
    );
};

export default Home;
