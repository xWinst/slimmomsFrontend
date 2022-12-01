import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useWidth } from '../../hooks/useWidth';
import { Icon } from 'components';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, option = 1, children }) => {
    // useEffect(() => {
    //     const handleKeyDown = e => {
    //         if (e.code === 'Escape') {
    //             onClose(e);
    //         }
    //         document.body.style.overflow = 'hidden';
    //         return () => (document.body.style.overflow = 'unset');
    //     };

    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => window.removeEventListener('keydown', handleKeyDown);
    // }, [onClose]);

    useEffect(() => {
        window.addEventListener('keydown', closeModal);
        return () => window.removeEventListener('keydown', closeModal);
    });

    const closeModal = event => {
        if (event.code === 'Escape') {
            onClose();
        }
    };

    const handleBackdropclick = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const width = useWidth();

    return createPortal(
        <div className={s.overlay} onClick={handleBackdropclick}>
            <div className={option === 1 ? s.modal : s.modalBottom}>
                {width <= 768 ? (
                    <div className={option === 1 ? s.muted : s.transparent}>
                        <Icon
                            className={s.goBack}
                            icon="goBack"
                            width="15"
                            height="9"
                            onClick={onClose}
                        />
                    </div>
                ) : (
                    <Icon
                        className={s.icon}
                        icon="close"
                        width="12"
                        height="12"
                        onClick={onClose}
                    />
                )}
                <div className={s.wrapper}>{children}</div>
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
