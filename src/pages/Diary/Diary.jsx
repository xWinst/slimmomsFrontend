import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProducts, deleteUserProducts } from 'redux/productOperation';
import { ProductList, Summary, ProductForm } from 'components';
import s from '../index.module.css';

const Diary = () => {
    const products = useSelector(state => state.product.products);
    const date = useSelector(state => state.product.date);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProducts(date));
    }, [dispatch, date]);

    const remove = id => {
        dispatch(deleteUserProducts(id));
    };

    return (
        <div className={s.container}>
            <div className={s.side}>
                <ProductForm />
                <ProductList list={products ?? []} remove={remove} />
            </div>
            <Summary />
        </div>
    );
};

export default Diary;
