import { useSelector } from 'react-redux';
import s from './Summary.module.css';

const Summary = () => {
    const dailyRate = useSelector(state => state.user.userData.dailyRate);
    const consumed = useSelector(state => state.product.consumed);
    const date = useSelector(state => state.product.date) || '';

    return (
        <div className={s.container}>
            <h2 className={s.title}>
                Summary for <span>{date.replaceAll('-', '/')}</span>
            </h2>
            <ul className={s.summary}>
                <li>Left : {dailyRate - consumed} kcal</li>
                <li>Consumed : {consumed} kcal</li>
                <li>Daily rate : {dailyRate} kcal</li>
                <li>
                    % of normal : {((consumed / dailyRate) * 100).toFixed(2)} %
                </li>
            </ul>
            <h2 className={s.title}>Food not recommended</h2>
            <span className={s.text}>
                All broths / decoctions, oily fish, caviar and meat, mushrooms,
                cereals (millet, barley, wheat)
            </span>
        </div>
    );
};

export default Summary;
