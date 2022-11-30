import s from './ConfirmationModal.module.css';

const ConfirmationModal = ({ text, onClose, onConfirm }) => {
    return (
        <div className={s.modalWrp}>
            <div className={s.LogOutModal__container}>
                <svg
                    onClick={onClose}
                    className={s.LogOutModal__close}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m1 1 12 12M1 13 13 1" />
                </svg>
                <div className={s.LogOutModal__group}>
                    <span className={s.LogOutModal__text}>{text}</span>
                    <button
                        className={s.modalBtn}
                        onClick={onConfirm}
                        type="button"
                    >
                        Yes
                    </button>
                    <button
                        className={s.modalBtn}
                        onClick={onClose}
                        type="button"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
