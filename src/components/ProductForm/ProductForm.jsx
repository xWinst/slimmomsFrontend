import { useState } from 'react';
import { Calendar, Icon } from 'components';
import s from './ProductForm.module.css';

const ProductForm = () => {
    const [date, setDate] = useState();
    const [initial, setInitial] = useState(new Date());
    const [product, setProduct] = useState();

    const getDate = date => {
        const year = date.toLocaleString('default', { year: 'numeric' });
        const month = date.toLocaleString('default', { month: '2-digit' });
        const day = date.toLocaleString('default', { day: '2-digit' });

        setDate(year + '-' + month + '-' + day);
    };

    return (
        <>
            <Calendar getDate={getDate} initial={initial} />
            <form className={s.form}>
                <input className={s.name} placeholder="Enter product name" value={product.name} onChange={() => {}} />

                <input
                    className={s.gramm}
                    placeholder="Grams"
                    value={product.weight}
                    // onChange={changeAmount}
                    // onBlur={blurAmount}
                    // onFocus={focusAmount}
                />

                <div className={s.button}>
                    <Icon icon="plus" width="14" height="14" onClick={() => {}} />
                </div>
            </form>
        </>
    );
};

export default ProductForm;
