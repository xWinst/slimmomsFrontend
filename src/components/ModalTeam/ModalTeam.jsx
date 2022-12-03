import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as LinkInIcon } from '../../images/team/linkedin.svg';
import { ReactComponent as GitHubIcon } from '../../images/team/github.svg';
import { ReactComponent as CloseIcon } from '../../images/team/close.svg';
import oleg from '../../images/team/oleg.jpg';
import volodymyr from '../../images/team/volodymyr.jpg';
import oleksandr from '../../images/team/oleksandr.jpg';
import oleksandralemaev from '../../images/team/oleksandralemaev.jpg';

import s from './ModalTeam.module.css';

const ModalTeam = ({ open, handler }) => {
    const lang = useSelector(state => state.user.lang);

    return ReactDOM.createPortal(
        <>
            {open && (
                <div className={s.backdrop}>
                    <div className={s.team__container}>
                        <CloseIcon
                            className={s.close__icon}
                            onClick={handler}
                        />
                        <div className={s.card__wrapper}>
                            <div className={s.card}>
                                <img
                                    src={oleg}
                                    alt="1"
                                    className={s.img}
                                    width="260"
                                    height="260"
                                />
                            </div>
                            <div className={s.title__container}>
                                <h3 className={s.member__title}>
                                    {lang.titleChuchin}
                                </h3>
                                <p className={s.role__text}>
                                    {lang.roleChuchin}
                                </p>
                            </div>
                            <ul className={s.social__list}>
                                <li className={s.list__item}>
                                    <a
                                        className={s.social__link}
                                        href="https://github.com/xWinst"
                                        target="blank"
                                    >
                                        <GitHubIcon className={s.github} />
                                    </a>
                                </li>
                                <li className={s.list__item}>
                                    <a
                                        className={s.social__link}
                                        href="https://www.linkedin.com/in/%D0%BE%D0%BB%D0%B5%D0%B3-%D1%87%D1%83%D1%87%D0%B8%D0%BD/"
                                        target="blank"
                                    >
                                        <LinkInIcon className={s.linkin} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={s.card__wrapper}>
                            <div className={s.card}>
                                <img
                                    src={volodymyr}
                                    alt="1"
                                    className={s.img}
                                    width="260"
                                    height="260"
                                />
                            </div>
                            <div className={s.title__container}>
                                <h3 className={s.member__title}>
                                    {lang.titleBondarenko}
                                </h3>
                                <p className={s.role__text}>
                                    {lang.roleBondarenko}
                                </p>
                            </div>
                            <ul className={s.social__list}>
                                <li className={s.list__item}>
                                    <a
                                        className={s.social__link}
                                        href="https://github.com/Qweeqer"
                                        target="blank"
                                    >
                                        <GitHubIcon className={s.github} />
                                    </a>
                                </li>
                                <li className={s.list__item}>
                                    <a
                                        className={s.social__link}
                                        href="https://www.linkedin.com/in/volodymyr-bondarenko"
                                        target="blank"
                                    >
                                        <LinkInIcon className={s.linkin} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={s.card__wrapper}>
                            <div className={s.card}>
                                <img
                                    src={oleksandr}
                                    alt="1"
                                    className={s.img}
                                    width="260"
                                    height="260"
                                />
                            </div>
                            <div className={s.title__container}>
                                <h3 className={s.member__title}>
                                    {lang.titleZhovtyi}
                                </h3>
                                <p className={s.role__text}>
                                    {lang.roleDeveloper}
                                </p>
                            </div>
                            <ul className={s.social__list}>
                                <li className={s.list__item}>
                                    <a
                                        className={s.social__link}
                                        href="https://github.com/AleksZhov"
                                        target="blank"
                                    >
                                        <GitHubIcon className={s.github} />
                                    </a>
                                </li>
                                <li className={s.list__item}>
                                    <a
                                        className={s.social__link}
                                        href="https://www.linkedin.com/in/александр-жовтый-131556247/"
                                        target="blank"
                                    >
                                        <LinkInIcon className={s.linkin} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={s.card__wrapper}>
                            <div className={s.card}>
                                <img
                                    src={oleksandralemaev}
                                    alt="1"
                                    className={s.img}
                                    width="260"
                                    height="260"
                                />
                            </div>
                            <div className={s.title__container}>
                                <h3 className={s.member__title}>
                                    {lang.titleAlemaev}
                                </h3>
                                <p className={s.role__text}>
                                    {lang.roleDeveloper}
                                </p>
                            </div>
                            <ul className={s.social__list}>
                                <li className={s.list__item}>
                                    <a
                                        className={s.social__link}
                                        href="https://github.com/Oleksandr26"
                                        target="blank"
                                    >
                                        <GitHubIcon className={s.github} />
                                    </a>
                                </li>
                                <li className={s.list__item}>
                                    <a
                                        className={s.social__link}
                                        href="https://www.linkedin.com/"
                                        target="blank"
                                    >
                                        <LinkInIcon className={s.linkin} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>,
        document.body
    );
};
export default ModalTeam;
