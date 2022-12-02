import { Link } from 'react-router-dom';
import logo from 'images/logo.png';
import s from './Logo.module.css';

const Logo = ({ width, isLogged }) => {
    return (
        <Link to="/" className={s.link}>
            <img className={s.logo} src={logo} alt="logo" />
            {(isLogged || width > 767) && (
                <p className={s.text}>
                    Slim<span className={s.subText}>Mom</span>
                </p>
            )}
        </Link>
    );
};

export default Logo;
