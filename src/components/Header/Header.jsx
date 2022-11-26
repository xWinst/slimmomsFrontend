import s from './Header.module.css';
import SlimMomsLogoMobile from '../../images/slim-mom-logo-mobile.svg';
import SlimMomsLogoDesktop from '../../images/slim-mom-logo-desktop.svg';
import SlimText from '../../images/Slim.svg';
import MomText from '../../images/Mom.svg';
import { Link } from 'react-router-dom';
import { NavBar, UserMenu } from 'components';
import { useWidth } from 'hooks/useWidth';
import { useSelector } from 'react-redux';
const Header = ({ isHidden }) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const width = useWidth();
    return (
        <header>
            <div className={s.headWrapper}>
                <div className={s.logoAndNavBarWrapp}>
                    <Link className={s.logoLink} to="/">
                        <img
                            className={s.logo}
                            src={width < 1280 ? SlimMomsLogoMobile : SlimMomsLogoDesktop}
                            alt="SlimMoms-logo"
                            height={width < 1280 ? '44' : '66'}
                            width={width < 1280 ? '47' : '167'}
                        />
                        {((isLoggedIn && width < 1280) || (width > 767 && width < 1280)) && (
                            <>
                                <img className={s.logo__text} src={SlimText} alt="Slim" height="16" width="47" />
                                <img className={s.logo__text} src={MomText} alt="Slim" height="16" width="53" />
                            </>
                        )}
                    </Link>
                </div>
                {(!isLoggedIn || width > 1279) && <NavBar isLoggedIn={isLoggedIn} isHidden={isHidden}></NavBar>}

                <div className={s.userMenuAndBurgerWrapp}>
                    {isLoggedIn && width > 767 && <UserMenu></UserMenu>}
                    {
                        isLoggedIn && width < 1280 && <NavBar isLoggedIn={isLoggedIn} isHidden={isHidden} />
                    }
                </div>
            </div>
            {isLoggedIn && width < 768 && <UserMenu></UserMenu>}
        </header>
    );
};

export default Header;
