import s from './Button.module.css';

const Button = ({ text, customType, type = 'button', children, onClick }) => {
    const addType = customType === 'primary' ? s.primary : s.secondary;
    return (
        <button
            type={type}
            className={`${s.button} ${addType}`}
            onClick={onClick}
        >
            {text}
            {children}
        </button>
    );
};

export default Button;
