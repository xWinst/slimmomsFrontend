import s from './Button.module.css';

const Button = ({ cn, type = 'button', onClick, children }) => {
    const className = s[cn] || s.button;
    return (
        <button type={type} className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
