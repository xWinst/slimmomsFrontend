import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../components/Button/Button';
import s from './PageNotFound.module.css';

const PageNotFound = () => {
    const navigate = useNavigate();
    const lang = useSelector(state => state.user.lang);

    const handleBtnClick = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className={s.container}>
            <div className={s.background}>
                <h2 className={s.title}>{lang.notFoundTitle}</h2>
                <div className={s.img}></div>
                <p className={s.text}>{lang.notFoundText}</p>

                <Button onClick={handleBtnClick}>{lang.goHome}</Button>
            </div>
        </div>
    );
};

export default PageNotFound;
