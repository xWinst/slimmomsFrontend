import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    return (
        <nav className={s.navig}>
            {isLoggedIn ? (
                <>
                    <NavLink
                        className={s.navlink}
                        style={({ isActive }) => ({
                            color: isActive ? '#9b9faa' : '#212121',
                        })}
                        to="/diary"
                    >
                        Diary
                    </NavLink>
                    <NavLink
                        className={s.navlink}
                        style={({ isActive }) => ({
                            color: isActive ? '#9b9faa' : '#212121',
                        })}
                        to="/calculator"
                    >
                        Calculator
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink
                        className={s.navlink}
                        style={({ isActive }) => ({
                            color: isActive ? '#9b9faa' : '#212121',
                        })}
                        to="/login"
                    >
                        Sign in
                    </NavLink>
                    <NavLink
                        className={s.navlink}
                        style={({ isActive }) => ({
                            color: isActive ? '#9b9faa' : '#212121',
                        })}
                        to="/register"
                    >
                        Registration
                    </NavLink>
                </>
            )}
        </nav>
    );
};

export default NavBar;