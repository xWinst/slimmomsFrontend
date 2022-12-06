import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWeight } from 'redux/productOperation';
import { Icon } from 'components';
import s from './WeightForm.module.css';

const WeightForm = () => {
    const [weight, setWeight] = useState('');
    const [error, setError] = useState();
    const date = useSelector(state => state.product.date);
    const lang = useSelector(state => state.user.lang);
    const dispatch = useDispatch();

    const onChange = e => {
        const { value } = e.target;
        if (!Number(value) && value) return;
        setWeight(value);
        setError(false);
    };

    const saveWeight = () => {
        if (weight < 20) {
            setError(true);
            return;
        }
        dispatch(updateWeight({ date, weight }));
        setWeight('');
    };

    return (
        <>
            <form className={s.form}>
                <input
                    className={s.input}
                    placeholder={lang.yourWeight}
                    value={weight}
                    onChange={onChange}
                />
                {error && <p className={s.error}>{lang.errorWeight}</p>}

                <div className={s.button} onClick={saveWeight}>
                    <Icon icon="plus" width="14" height="14" />
                </div>
            </form>
        </>
    );
};

export default WeightForm;
