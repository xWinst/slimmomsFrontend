import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Logo, NavBar, UserMenu } from 'components';
import { useWidth } from 'hooks/useWidth';
import s from './Header.module.css';

const Header = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const [hidden, setHidden] = useState(false);
    const width = useWidth();

    const onClick = () => {
        setHidden(state => !state);
    };

    return (
        <header>
            <div className={s.container}>
                <Logo width={width} isLogged={isLoggedIn} />
                <NavBar hidden={hidden} />
            </div>
            <div className={s.line}></div>
            {isLoggedIn && <UserMenu onClick={onClick} />}
        </header>
    );
};

export default Header;
