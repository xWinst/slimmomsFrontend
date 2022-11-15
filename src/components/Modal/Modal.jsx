import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = () => {
    return createPortal(
        <div className={s.overlay} onClick={() => {}}>
            <div className={s.modal}></div>
        </div>,
        modalRoot
    );
};

export default Modal;
