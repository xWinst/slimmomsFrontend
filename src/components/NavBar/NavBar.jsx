import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';
import { useSelector } from 'react-redux';


import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const getActive = ({ isActive }) => (isActive ? s.linkActive : s.link);
const getmobileLinkActive = ({ isActive }) => (isActive ? s.mobileNavigationLink : s.mobileNavigationLinkActive);
const NavBar = ({ isHidden }) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const hidden = isHidden ? s.isHidden : null; // ховає навігацію на Login Page та Registration Page

    const [visibleMenu, setVisibleMenu] = useState(false);


  const handleMenuBtnClick = () => {
    setVisibleMenu(prev => !prev);
  };
    return (
        <nav className={`${s.navigation} ${hidden}`}>
            {!isLoggedIn && (
                <>
                    <NavLink to="/login" className={getActive}>
                        Sign in
                    </NavLink>
                    <NavLink to="/register" className={getActive}>
                        Registration
                    </NavLink>
                </>
            )}
            {isLoggedIn && (
                <div className={s.isHidden}>
                    {visibleMenu ? (
                        <>
                            <CloseIcon onClick={handleMenuBtnClick} />
                            <ul className={s.mobileNavigation}>
                                <li className={s.mobileNavigationItem}>
                                    <NavLink
                                        to="/diary"
                                        className={getmobileLinkActive}
                                    >
                                        Diary
                                    </NavLink>
                                </li>
                                <li className={s.mobileNavigationItem}>
                                    <NavLink
                                        to="/calculator"
                                        className={getmobileLinkActive}
                                    >
                                        Calculator
                                    </NavLink>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <MenuIcon onClick={handleMenuBtnClick} />
                    )}
                </div>
            )}
            {isLoggedIn && (
                <div className={s.toggleHidden}>
                    <NavLink to="/diary" className={getActive} >
                        Diary
                    </NavLink>
                    <NavLink to="/calculator" className={getActive} >
                        Calculator
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
