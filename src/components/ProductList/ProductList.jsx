import { useSelector } from 'react-redux';
import { Icon } from 'components';
import s from './ProductList.module.css';

const ProductList = ({ list, remove }) => {
    const lang = useSelector(state => state.user.lang);
    const idx = lang.lang === 'ua' ? 0 : 1;

    return (
        <>
            {list.length === 0 && <p className={s.empty}>{lang.emptyText}</p>}
            <ul className={s.list}>
                {list.map(({ _id, name, weight, calories }) => (
                    <li className={s.product} key={_id}>
                        <p className={s.title}>
                            {name.length === 1 ? name[0] : name[idx]}
                        </p>
                        <p className={s.info}>{weight} g</p>
                        <p className={s.kcal}>{calories} kcal</p>
                        <Icon
                            className={s.icon}
                            icon="close"
                            width="12"
                            height="12"
                            onClick={() => remove(_id, calories)}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProductList;
