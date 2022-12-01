import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import s from './PageNotFound.module.css';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleBtnClick = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className={s.container}>
            <div className={s.background}>
                <h2 className={s.title}>404 Page Not Found</h2>
                <div className={s.img}></div>
                <p className={s.text}>
                    Oops! The page you're looking for doesn't exist.
                </p>

                <Button
                    customType="primary"
                    text="Go home"
                    onClick={handleBtnClick}
                />
            </div>
        </div>
    );
};

export default PageNotFound;
