import { ModalTeam, TeamBTN } from 'components';
import { useEffect, useState } from 'react';

import s from './Container.module.css';
const isLoggedIn = false;
const Container = ({ children }) => {

    // const isRefreshingUser = useSelector(state => state.auth.isRefreshingUser);
    const [open, setOpen] = useState(false);
    const closeModal = () => {
        setOpen(!open);
    };

    const toggleModal = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const handleCloseModal = event => {
            if (event.code === 'Escape') {
                setOpen(!open);
            }
        };

        window.addEventListener('keydown', handleCloseModal);
        return () => window.removeEventListener('keydown', handleCloseModal);
    }, [open]);

    useEffect(() => {
        const body = document.querySelector('body');
        if (open) {
            body.classList.add('hidden');
        }

        return () => {
            body.classList.remove('hidden');
        };
    });

    return <div className={isLoggedIn ? s.containerLoggedIn : s.container}>{children}
        <TeamBTN handler={toggleModal} />
    {open && <ModalTeam open={open} handler={closeModal} />}
    </div>;
};
export default Container;