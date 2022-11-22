import icons from 'images/icons.svg';

const Icon = ({ icon, className, onClick, width, height }) => {
    return (
        <svg className={className} onClick={onClick} width={width} height={height}>
            <use href={`${icons}#${icon}`} />
        </svg>
    );
};

export default Icon;
