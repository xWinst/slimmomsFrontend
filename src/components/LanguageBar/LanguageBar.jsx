import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { languageSelection } from 'redux/userReducers';
import { Icon } from 'components';
import s from './LanguageBar.module.css';

const LanguageBar = () => {
    const [currentLang, setCurrentLang] = useState('en');
    const [isShow, setIsShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('click', onClick);
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('click', onClick);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    const onClick = event => {
        if (event.target.name !== 'btn') {
            setIsShow(false);
        }
    };

    const onKeyDown = event => {
        if (event.code === 'Tab' || event.code === 'Escape') {
            setIsShow(false);
        }
    };

    const setLang = lang => {
        setCurrentLang(lang);
        dispatch(languageSelection(lang));
    };

    const showSelection = () => {
        setIsShow(state => !state);
    };

    const selectLanguage = event => {
        setLang(event.target.dataset.key);
        setIsShow(false);
    };

    return (
        <div className={s.container}>
            <button
                className={s.btn}
                name="btn"
                type="button"
                onClick={showSelection}
            >
                <Icon
                    className={s.icon}
                    icon={currentLang}
                    width="24"
                    height="16"
                />
            </button>
            {isShow && (
                <ul className={s.list}>
                    <li
                        className={s.item}
                        data-key="ua"
                        onClick={selectLanguage}
                    >
                        <Icon
                            className={s.icon}
                            icon="ua"
                            width="24"
                            height="16"
                        />
                        &nbsp;Українська
                    </li>
                    <li
                        className={s.item}
                        data-key="en"
                        onClick={selectLanguage}
                    >
                        <Icon
                            className={s.icon}
                            icon="en"
                            width="24"
                            height="16"
                        />
                        &nbsp;English
                    </li>
                </ul>
            )}
        </div>
    );
};

export default LanguageBar;
