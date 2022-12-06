import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import s from './Select.module.css';

const Select = ({ products, getProduct, close }) => {
    const bloodGroup = useSelector(state => state.user.userData?.bloodGroup);
    const lang = useSelector(state => state.user.lang);

    useEffect(() => {
        const onClick = event => {
            if (event.target.name !== 'list') close();
        };

        const onKeyDown = event => {
            if (event.code === 'Tab' || event.code === 'Escape') close();
        };

        window.addEventListener('click', onClick);
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('click', onClick);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [close]);

    const getClass = product => {
        return product.groupBloodNotAllowed[bloodGroup] ? s.warning : s.item;
    };

    return (
        <div className={s.container}>
            <ul className={s.list} name="list">
                {products.map(product => (
                    <li
                        key={product.title.ua}
                        className={getClass(product)}
                        onClick={() => getProduct(product)}
                    >
                        <p className={s.title}>{product.title[lang.lang]}</p>
                        <div className={s.thumb}>
                            <p>
                                {product.weight} {lang.gramm}
                            </p>
                            <p>
                                {product.calories} {lang.kcal}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
