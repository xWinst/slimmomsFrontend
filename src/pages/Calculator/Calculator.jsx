import { NavLink } from 'react-router-dom';
import s from '../index.module.css';
import { SummaryForDate } from 'components';

const Calculator = () => {
    return (
        <div className={s.container}>
            <h2>Calculate your daily calorie intake right now</h2>
            <form>
                <input type="text" name="Height" placeholder={'Height *'} />
                <input type="text" name="Age" placeholder={'Age *'} />
                <input type="text" name="Current weight" placeholder={'Current weight *'} />
                <input type="text" name="Desired weight" placeholder={'Desired weight *'} />
                <fieldset>
                    <legend>Blood type *</legend>
                    <input type="radio" id="1" name="BloodType" value="1" />
                    <label htmlFor="1">1</label>
                    <input type="radio" id="2" name="BloodType" value="2" />
                    <label htmlFor="2">2</label>
                    <input type="radio" id="3" name="BloodType" value="3" />
                    <label htmlFor="3">3</label>
                    <input type="radio" id="4" name="BloodType" value="4" />
                    <label htmlFor="4">4</label>
                </fieldset>
            </form>
            <NavLink to="/diary">Start losing weight</NavLink>
            <SummaryForDate />
        </div>
    );
};

export default Calculator;
