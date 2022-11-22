import s from './UserMenu.module.css';
const name = 'Nic';

const UserMenu = () => {
    return (
        <div className={s.userMenuWrapper}>
            <p className={s.loginName}>{name}</p>
            <button className={s.exitBtn} type="button">
                Exit
            </button>
        </div>
    );
};
export default UserMenu;
