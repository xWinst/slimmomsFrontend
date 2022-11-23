import s from './Diary.module.css';
import { NavLink } from 'react-router-dom';
import ProductList from './ProductList/ProductList';
import SummaryForDate from './SummaryForDate/SummaryForDate';

const Diary = () => {
    return (
        <div>
            <h2 className={s.date}>date</h2>
            <ProductList />
            <NavLink to="/addindiary">+</NavLink>
            <SummaryForDate />
        </div>
    );
};

export default Diary;
