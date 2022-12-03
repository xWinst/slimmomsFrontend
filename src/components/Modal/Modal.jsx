import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from 'components';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, style, children }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    });

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

    console.log('style: ', style);
    return createPortal(
        <div className={s.overlay} onClick={handleBackdropclick}>
            <div className={s.modal} style={style}>
                <Icon
                    className={s.icon}
                    icon="close"
                    width="12"
                    height="12"
                    onClick={onClose}
                />
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
