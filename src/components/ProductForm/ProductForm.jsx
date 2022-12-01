import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Select } from 'components';
import { add } from 'redux/productOperation';
import { useWidth } from 'hooks/useWidth';
import message from 'helpers/Message';
import s from './ProductForm.module.css';
import Button from 'components/Button/Button';

const ProductForm = ({ close }) => {
    const date = useSelector(state => state.product.date);
    const [product, setProduct] = useState({ name: '', weight: '' });
    const [visibleProduct, setVisibleProduct] = useState(null);
    const allProducts = useSelector(state => state.product.allProducts);
    const dispatch = useDispatch();
    const width = useWidth();

    const onChange = e => {
        if (e.target.name === 'name' && e.target.value !== '') {
            const array = allProducts.filter(product =>
                product.title.ua
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
            setVisibleProduct(array);
        } else setVisibleProduct(null);
        setProduct(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const addProduct = () => {
        const { name, calories, weight, defaultWeight } = product;
        console.log('product: ', product);
        if (calories) {
            dispatch(
                add({
                    name,
                    weight,
                    date,
                    calories: Math.round(
                        (calories * Number.parseFloat(weight)) / defaultWeight
                    ),
                })
            );
        } else
            message.warning(
                'You must select a product from the list',
                `Please try again`,
                'Ok'
            );
        setProduct({ name: '', weight: '' });
        if (close) close();
    };

    const getProduct = product => {
        setProduct({
            name: product.title.ua,
            weight: product.weight,
            calories: product.calories,
            defaultWeight: product.weight,
        });
        setVisibleProduct(null);
    };

    return (
        <>
            <form className={s.form}>
                <input
                    className={s.name}
                    name="name"
                    placeholder="Enter product name"
                    value={product.name}
                    onChange={onChange}
                    autoComplete="false"
                />

                <input
                    className={s.gramm}
                    name="weight"
                    placeholder="Grams"
                    value={product.weight}
                    onChange={onChange}
                    type="number"
                />

                {width < 768 ? (
                    <Button
                        text="Add"
                        customType="primary"
                        onClick={addProduct}
                    />
                ) : (
                    <div className={s.button}>
                        <Icon
                            icon="plus"
                            width="14"
                            height="14"
                            onClick={addProduct}
                        />
                    </div>
                )}
            </form>
            {visibleProduct && (
                <Select products={visibleProduct} getProduct={getProduct} />
            )}
        </>
    );
};

export default ProductForm;
