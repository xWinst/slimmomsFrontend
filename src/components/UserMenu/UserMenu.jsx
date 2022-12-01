import s from './UserMenu.module.css';
import { useSelector } from 'react-redux';

function UserMenu({ onOpenModalClick }) {
    const userName = useSelector(state => state.user.userData.name);

    return (
        <div className={s.userMenuWrapper}>
            <p className={s.loginName}>{userName}</p>
            <button
                className={s.exitBtn}
                type="button"
                onClick={() => onOpenModalClick()}
            >
                Exit
            </button>
        </div>
    );
}
export default UserMenu;
