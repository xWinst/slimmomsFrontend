import s from './Button.module.css';

const Button = ({ text, customType, type, children, className, onClick }) => {
    const addType = customType === 'primary' ? s.primary : s.secondary;
    const addClass = s[className];
    return (
        <button
            type={type}
            className={`${s.button} ${addType} ${addClass}`}
            onClick={onClick}
        >
            {text}
            {children}
        </button>
    );
};

export default Button;
