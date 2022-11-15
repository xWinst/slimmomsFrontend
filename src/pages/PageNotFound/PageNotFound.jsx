import s from './PageNotFound.module.css';

const PageNotFound = () => {
    return (
        <div className={s.container}>
            <div className={s.background}>
                <h2 className={s.title}>404 Page Not Found</h2>
                <p className={s.text}>Oops! The page you're looking for doesn't exist.</p>
            </div>
        </div>
    );
};

export default PageNotFound;
