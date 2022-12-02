import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProducts, deleteUserProducts } from 'redux/productOperation';
import { ProductList, Summary, ProductForm, Icon, Calendar } from 'components';
import { useWidth } from 'hooks/useWidth';
import s from '../index.module.css';

const Diary = () => {
    const products = useSelector(state => state.product.products);
    const date = useSelector(state => state.product.date);

    const dispatch = useDispatch();
    const width = useWidth();

    useEffect(() => {
        dispatch(getUserProducts(date));
    }, [dispatch, date]);

    const remove = id => {
        dispatch(deleteUserProducts(id));
    };

    return (
        <div className={s.container}>
            <div className={s.side}>
                <Calendar />
                {width > 767 && <ProductForm />}
                <ProductList list={products ?? []} remove={remove} />
            </div>
            <Link to="/form" className={s.button}>
                <Icon icon="plus" width="14" height="14" />
            </Link>
            <Summary />
        </div>
    );
};

export default Diary;
