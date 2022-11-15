import icons from 'images/icons.svg';

const Icon = ({ icon, className, onClick }) => {
    return (
        <svg className={className} onClick={onClick}>
            <use href={`${icons}#${icon}`} />
        </svg>
    );
};

export default Icon;
