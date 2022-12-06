import { useEffect } from 'react';
import { createPortal } from 'react-dom';
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

    return createPortal(
        <div className={s.overlay} onClick={handleBackdropclick}>
            <div className={s.modal} style={style}>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
