import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProducts, deleteUserProducts } from 'redux/productOperation';
import {
    ProductList,
    Summary,
    ProductForm,
    Icon,
    Modal,
    Calendar,
} from 'components';
import { useWidth } from 'hooks/useWidth';
import s from '../index.module.css';

const Diary = () => {
    const [isShowModal, setIsShowModal] = useState(false);
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

    const goProductForm = () => {
        setIsShowModal(true);
    };

    const close = () => {
        setIsShowModal(false);
    };

    return (
        <div className={s.container}>
            <div className={s.side}>
                <Calendar />
                {width > 767 && <ProductForm />}
                <ProductList list={products ?? []} remove={remove} />
            </div>
            <div className={s.button}>
                <Icon
                    icon="plus"
                    width="14"
                    height="14"
                    onClick={goProductForm}
                />
            </div>
            <Summary />
            {isShowModal && (
                <Modal onClose={close} option={2}>
                    <div className={s.modalContainer}>
                        <ProductForm close={close} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Diary;
