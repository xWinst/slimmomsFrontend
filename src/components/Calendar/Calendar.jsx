import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import { Icon } from 'components';
import { chooseDate } from 'redux/productReducers';
import s from './Calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();
    useEffect(() => {
        const changeDate = () => {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            dispatch(chooseDate(day + '-' + month + '-' + year));
        };
        changeDate();
    }, [dispatch, date]);

    return (
        <div className={s.container}>
            <DatePicker
                maxDate={new Date()}
                selected={date}
                onChange={date => setDate(date)}
                className={s.datePicker}
                dateFormat="dd.MM.yyyy"
            />
            <Icon className={s.icon} icon={`calendar`} width="22" height="22" />
        </div>
    );
};

export default Calendar;
