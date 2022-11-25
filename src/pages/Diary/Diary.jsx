// import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from 'redux/productOperation';
import { ProductList, SummaryForDate, ProductForm } from 'components';
import s from './Diary.module.css';

const Diary = () => {
    const allProducts = useSelector(state => state.product.allProducts);

    const dispatch = useDispatch();
    if (!allProducts) {
        dispatch(getAllProducts());
    }

    return (
        <div className={s.container}>
            <div className={s.diary}>
                <ProductForm />
                <ProductList />
            </div>
            <div></div>
            {/* <h2 className={s.date}>date</h2>
            <NavLink to="/addindiary">+</NavLink> */}
            <SummaryForDate />
        </div>
    );
};

export default Diary;
