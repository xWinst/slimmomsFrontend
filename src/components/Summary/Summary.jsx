import { HarmfulProductsList } from 'components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './Summary.module.css';

const Summary = () => {
    const dailyRate = useSelector(state => state.user.userData.dailyRate);
    const consumed = useSelector(state => state.product.consumed);
    const date = useSelector(state => state.product.date) || '';

    return (
        <div className={s.container}>
            {dailyRate ? (
                <>
                    <div>
                        <h2 className={s.title}>
                            Summary for <span>{date.replaceAll('-', '/')}</span>
                        </h2>
                        <ul className={s.summary}>
                            <li className={s.item}>
                                <p>Left</p>
                                <p>{dailyRate - consumed} kcal</p>
                            </li>
                            <li className={s.item}>
                                <p>Consumed</p>
                                <p>{consumed} kcal</p>
                            </li>
                            <li className={s.item}>
                                <p>Daily rate</p>
                                <p>{dailyRate} kcal</p>
                            </li>
                            <li className={s.item}>
                                <p>% of normal</p>
                                <p>
                                    {((consumed / dailyRate) * 100).toFixed(2)}{' '}
                                    %
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className={s.title}>Food not recommended</h2>
                        <HarmfulProductsList />
                    </div>
                </>
            ) : (
                <div>
                    <p className={s.note}>
                        To see the summary you need to calculate the daily
                        calorie intake
                    </p>
                    <Link className={s.link} to="/calculator">
                        Go to calculate
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Summary;
