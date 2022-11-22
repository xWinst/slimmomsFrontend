import { useDispatch } from 'react-redux';
// import { useState } from 'react';
import { logIn } from 'redux/userOperations';
// import { Modal } from 'components';
import s from '../index.module.css';
import { Container, Header } from 'components';

const Home = () => {
    const dispatch = useDispatch();
    //Modal//
    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => {
    //     setShowModal(true);
    // };
    // const closeModal = () => {
    //     setShowModal(false);
    // };
    ///----------------

    const signin = () => {
        console.log('click');
        dispatch(logIn());
    };

    return (

        <section className={s.container}>
            HOME
            <button type="button" onClick={signin}>
                Login
            </button>
            {/* Modal */}
            {/* <button type="button" onClick={openModal}>
                Modal
            </button>
            {showModal && <Modal onClose={closeModal}></Modal>} */}
        </section>
    );
};

export default Home;
