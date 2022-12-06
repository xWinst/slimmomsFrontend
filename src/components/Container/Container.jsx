import { ModalTeam, TeamBTN } from 'components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import s from './Container.module.css';
const Container = ({ children }) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
    };

    const openModal = () => {
        setOpen(true);
    };

    useEffect(() => {
        const body = document.querySelector('body');
        if (open) {
            body.classList.add('hidden');
        }

        return () => {
            body.classList.remove('hidden');
        };
    });

    return (
        <div className={isLoggedIn ? s.containerLoggedIn : s.container}>
            {children}
            <TeamBTN handler={openModal} />
            {open && <ModalTeam close={closeModal} />}
        </div>
    );
};
export default Container;
