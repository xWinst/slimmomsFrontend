import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon, LanguageBar, Modal } from 'components';
import { useWidth } from 'hooks/useWidth';
import s from './NavBar.module.css';

const getActive = ({ isActive }) => (isActive ? s.linkActive : s.link);
const getClass = ({ isActive }) => (isActive ? s.active : s.passive);

const NavBar = ({ hidden }) => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const lang = useSelector(state => state.user.lang);
    const width = useWidth();

    useEffect(() => {
        setIsShowMenu(false);
    }, [hidden]);

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
                            {lang.diary}
                        </NavLink>
                        <NavLink to="/calculator" className={getActive}>
                            {lang.calculator}
                        </NavLink>
                        <NavLink to="/reports" className={getActive}>
                            {lang.reports}
                        </NavLink>
                        <LanguageBar />
                    </>
                )
            ) : (
                <>
                    <NavLink to="/login" className={getActive}>
                        {lang.login}
                    </NavLink>
                    <NavLink to="/register" className={getActive}>
                        {lang.register}
                    </NavLink>
                    <LanguageBar />
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
                            {lang.diary}
                        </NavLink>
                        <NavLink
                            to="/calculator"
                            className={getClass}
                            onClick={closeMenu}
                        >
                            {lang.calculator}
                        </NavLink>
                        <NavLink
                            to="/reports"
                            className={getClass}
                            onClick={closeMenu}
                        >
                            {lang.reports}
                        </NavLink>
                        <LanguageBar big />
                    </div>
                </Modal>
            )}
        </nav>
    );
};

export default NavBar;
