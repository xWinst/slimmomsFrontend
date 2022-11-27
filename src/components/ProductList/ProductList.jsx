// import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'components';
// import { getUserProducts } from 'redux/productOperation';
import s from './ProductList.module.css';

const ProductList = ({ list, remove }) => {
    // const products = useSelector(state => state.product.products);
    // // const user = useSelector(state => state.user.userData.id);
    // // console.log('user: ', user);
    // const dispatch = useDispatch();
    // if (!products) {
    //     dispatch(getUserProducts());

    return (
        <ul className={s.list}>
            {list.map(product => (
                <li className={s.product} key={product._id}>
                    <p className={s.title}>{product.name}</p>
                    <p className={s.info}>{product.weight} g</p>
                    <p className={s.info}>{product.calories} kcal</p>
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
    );
};

export default ProductList;
