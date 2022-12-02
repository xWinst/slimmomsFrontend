import { useSelector } from 'react-redux';
import s from './Select.module.css';

const Select = ({ products, getProduct }) => {
    const bloodGroup = useSelector(state => state.user.userData?.bloodGroup);

    const getClass = product => {
        return product.groupBloodNotAllowed[bloodGroup] ? s.warning : s.item;
    };

    return (
        <div className={s.container}>
            <ul className={s.list}>
                {products.map(product => (
                    <li
                        key={product._id}
                        className={getClass(product)}
                        onClick={() => getProduct(product)}
                    >
                        <p className={s.title}>{product.title.ua}</p>
                        <div className={s.thumb}>
                            <p>{product.weight} g</p>
                            <p>{product.calories} kcal</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
