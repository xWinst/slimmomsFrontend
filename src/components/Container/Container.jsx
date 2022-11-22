import s from './Container.module.css';
const isLoggedIn = false;
const Container = ({ children }) => {
    return <div className={isLoggedIn ? s.containerLoggedIn : s.container}>{children}</div>;
};
export default Container;
