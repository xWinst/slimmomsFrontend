import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Charts } from 'components';
import s from 'pages/index.module.css';

const Reports = () => {
    const [time, setTime] = useState();
    const lang = useSelector(state => state.user.lang);

    const chooseTime = isAllPeriod => setTime(isAllPeriod);

    return (
        <div className={s.reports}>
            <div className={s.thumbBtns}>
                <Button cn="chart" onClick={() => chooseTime(false)}>
                    {lang.month}
                </Button>
                <Button cn="chart" onClick={() => chooseTime(true)}>
                    {lang.all}
                </Button>
            </div>
            <ul className={s.legend}>
                <li className={s.item}>
                    <div className={s.dailyRate}></div>
                    <span>{lang.dailyRateTitle}</span>
                </li>
                <li className={s.item}>
                    <div className={s.consumed}></div>
                    <span>{lang.consumedTitle}</span>
                </li>
                <li className={s.item}>
                    <div className={s.weight}></div>
                    <span>{lang.weight}</span>
                </li>
            </ul>
            <Charts isAlltime={time} />
        </div>
    );
};

export default Reports;
