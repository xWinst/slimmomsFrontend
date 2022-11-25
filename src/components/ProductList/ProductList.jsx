import { Icon } from 'components';
import { useSelector, useDispatch } from 'react-redux';

const ProductList = () => {
    const products = useSelector(state => state.product.products);
    return (
        <ul>
            {products.map(product => (
                <li key={product._id}>
                    <p>{product.title.ua}</p>
                    <p>{product.weight} g</p>
                    <p>{product.calories} kcal</p>
                    <Icon icon="close" width="12" height="12" />
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
