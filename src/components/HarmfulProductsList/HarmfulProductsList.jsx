import { useSelector } from 'react-redux';
import s from './HarmfulProductsList.module.css';

const getRandomProduct = max => {
    const result = [];
    while (result.length < 4) {
        const rnd = Math.floor(Math.random() * max);
        if (result.includes(rnd)) continue;
        result.push(rnd);
    }
    return result;
};

const HarmfulProductsList = ({ blood }) => {
    const bloodGroup =
        useSelector(state => state.user.userData?.bloodGroup) || blood;
    const allProducts = useSelector(state => state.product.allProducts);

    const harmfulProducts = allProducts.filter(
        product => !product.groupBloodNotAllowed[bloodGroup]
    );

    const indexes = getRandomProduct(harmfulProducts.length);

    return (
        <ol className={s.list}>
            {indexes.map(i => (
                <li key={i} className={s.item}>
                    {harmfulProducts[i].title.ua}
                </li>
            ))}
        </ol>
    );
};

export default HarmfulProductsList;
