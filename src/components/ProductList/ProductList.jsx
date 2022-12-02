import { Icon } from 'components';
import s from './ProductList.module.css';

const ProductList = ({ list, remove }) => {
    return (
        <>
            {list.length === 0 && (
                <p className={s.empty}>There are no records for this day</p>
            )}
            <ul className={s.list}>
                {list.map(product => (
                    <li className={s.product} key={product._id}>
                        <p className={s.title}>{product.name}</p>
                        <p className={s.info}>{product.weight} g</p>
                        <p className={s.kcal}>{product.calories} kcal</p>
                        <Icon
                            className={s.icon}
                            icon="close"
                            width="12"
                            height="12"
                            onClick={() => remove(product._id)}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProductList;
