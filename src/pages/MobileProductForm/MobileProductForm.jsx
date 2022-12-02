import { ProductForm, Icon } from 'components';
import { Navigate, Link } from 'react-router-dom';
import { useWidth } from 'hooks/useWidth';
import s from '../index.module.css';

const MobileProductForm = () => {
    return useWidth > 767 ? (
        <Navigate to="/diary" />
    ) : (
        <section className={s.container}>
            <Link to="/" className={s.link}>
                <Icon
                    className={s.goBack}
                    icon="goBack"
                    width="15"
                    height="9"
                />
            </Link>

            <ProductForm />
        </section>
    );
};

export default MobileProductForm;
