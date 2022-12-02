import { useSelector } from 'react-redux';
import { Logo, NavBar, UserMenu } from 'components';
import { useWidth } from 'hooks/useWidth';
import s from './Header.module.css';

const Header = ({ isHidden }) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const width = useWidth();

    return (
        <header>
            <div className={s.container}>
                <Logo width={width} isLogged={isLoggedIn} />
                <NavBar />
            </div>
            <div className={s.line}></div>
            {isLoggedIn && <UserMenu />}
        </header>
    );
};

export default Header;
