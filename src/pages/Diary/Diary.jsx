import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProducts, deleteUserProducts } from 'redux/productOperation';
import {
    ProductList,
    Summary,
    ProductForm,
    Icon,
    Calendar,
    Modal,
    Button,
} from 'components';
import { useWidth } from 'hooks/useWidth';
import s from '../index.module.css';

const Diary = () => {
    const products = useSelector(state => state.product.products);
    const date = useSelector(state => state.product.date);
    const lang = useSelector(state => state.user.lang);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState();

    const dispatch = useDispatch();
    const width = useWidth();

    useEffect(() => {
        dispatch(getUserProducts(date));
    }, [dispatch, date]);

    const remove = () => {
        dispatch(deleteUserProducts(id));
        setIsModalOpen(false);
    };

    const close = () => {
        setIsModalOpen(false);
    };
    const openModal = id => {
        setId(id);
        setIsModalOpen(true);
    };

    return (
        <div className={s.container}>
            <div className={s.side}>
                <Calendar />
                {width > 767 && <ProductForm />}
                <ProductList list={products ?? []} remove={openModal} />
            </div>
            <Link to="/form" className={s.button}>
                <Icon icon="plus" width="14" height="14" />
            </Link>
            <Summary />
            {isModalOpen && (
                <Modal onClose={close} style={{ width: 280, height: 160 }}>
                    <div className={s.modal}>
                        {lang.confirm}
                        <div className={s.thumb}>
                            <Button cn="width90" onClick={remove}>
                                {lang.buttonYes}
                            </Button>
                            <Button cn="width90" onClick={close}>
                                {lang.buttonNo}
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Diary;
