import React from 'react';
import team from '../../images/team/teamwork.png';
import s from './TeamBTN.module.css';

export default function TeamBTN({ handler }) {
    return (
        <div className={s.btn__container}>
            <img
                type="button"
                src={team}
                className={s.team__icon}
                onClick={handler}
                alt="1"
            />
        </div>
    );
}
