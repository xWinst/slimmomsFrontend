import { useSelector } from 'react-redux';
import s from './Select.module.css';

const Select = ({ products, getProduct }) => {
    const bloodGroup = useSelector(state => state.user.userData?.bloodGroup);
    const lang = useSelector(state => state.user.lang);

    const getClass = product => {
        return product.groupBloodNotAllowed[bloodGroup] ? s.warning : s.item;
    };

    return (
        <div className={s.container}>
            <ul className={s.list}>
                {products.map(product => (
                    <li
                        key={product.title.ua}
                        className={getClass(product)}
                        onClick={() => getProduct(product)}
                    >
                        <p className={s.title}>{product.title.ua}</p>
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
