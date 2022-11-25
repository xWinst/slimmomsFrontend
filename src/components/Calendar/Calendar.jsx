import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Icon } from 'components';
import s from './Calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ getDate, initial }) => {
    const [date, setDate] = useState(initial);

    useEffect(() => getDate(date));
    useEffect(() => setDate(new Date()), [initial]); //reset

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
