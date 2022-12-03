import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'components';
import { logOut } from 'redux/userOperations';
import s from './UserMenu.module.css';

const UserMenu = () => {
    const userName = useSelector(state => state.user.userData?.name);
    const lang = useSelector(state => state.user.lang);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const close = () => {
        setIsModalOpen(false);
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const logout = () => {
        dispatch(logOut());
        setIsModalOpen(false);
    };

    return (
        <div className={s.container}>
            <div className={s.userMenuWrapper}>
                <p className={s.loginName}>{userName}</p>
                <button className={s.exitBtn} type="button" onClick={openModal}>
                    {lang.exit}
                </button>
            </div>
            {isModalOpen && (
                <Modal onClose={close} style={{ width: 280, height: 160 }}>
                    <div className={s.modal}>
                        {lang.textLogOut}
                        <div className={s.thumb}>
                            <Button cn="width90" onClick={logout}>
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
export default UserMenu;
