import { Icon } from 'components';
import s from './Loader.module.css';

const Loader = () => {
    return (
        <div className={s.container}>
            <Icon className={s.img} icon="load" />
        </div>
    );
};

export default Loader;
