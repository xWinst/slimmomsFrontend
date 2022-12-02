import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon, Modal } from 'components';
import { useWidth } from 'hooks/useWidth';
import s from './NavBar.module.css';

const getActive = ({ isActive }) => (isActive ? s.linkActive : s.link);
const getClass = ({ isActive }) => (isActive ? s.active : s.passive);

const NavBar = ({ isHidden }) => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const width = useWidth();

    const openMenu = () => {
        setIsShowMenu(true);
    };

    const closeMenu = () => {
        setIsShowMenu(false);
    };

    return (
        <nav className={s.navigation}>
            {isLoggedIn ? (
                width < 1280 ? (
                    <Icon
                        className={s.menu}
                        icon={isShowMenu ? 'close' : 'menuBtn'}
                        width="18"
                        height="12"
                        onClick={isShowMenu ? closeMenu : openMenu}
                    />
                ) : (
                    <>
                        <NavLink to="/diary" className={getActive}>
                            Diary
                        </NavLink>
                        <NavLink to="/calculator" className={getActive}>
                            Calculator
                        </NavLink>
                    </>
                )
            ) : (
                <>
                    <NavLink to="/login" className={getActive}>
                        Sign in
                    </NavLink>
                    <NavLink to="/register" className={getActive}>
                        Registration
                    </NavLink>
                </>
            )}
            {isShowMenu && (
                <Modal onClose={closeMenu}>
                    <div className={s.modalContainer}>
                        <NavLink
                            to="/diary"
                            className={getClass}
                            onClick={closeMenu}
                        >
                            Diary
                        </NavLink>
                        <NavLink
                            to="/calculator"
                            className={getClass}
                            onClick={closeMenu}
                        >
                            Calculator
                        </NavLink>
                    </div>
                </Modal>
            )}
        </nav>
    );
};

export default NavBar;
