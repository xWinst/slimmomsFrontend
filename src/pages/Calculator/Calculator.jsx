// import { NavLink } from 'react-router-dom';
import { CalculatorForm, Summary } from 'components';
import s from '../index.module.css';

const Calculator = () => {
    return (
        <div className={s.container}>
            <div className={s.side}>
                <CalculatorForm />
            </div>
            <Summary />
        </div>
    );
};

export default Calculator;
