import s from '../LoginForm/LoginForm.module.css';
import { useState } from 'react';

const RegisterForm = () => {
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        setFormFields(prevState => ({ ...prevState, [name]: value }));
    };

    const reset = () => {
        setFormFields({
            name: '',
            email: '',
            password: '',
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        console.log(formFields);

        reset();
    };
    return (
        <form className={s.loginForm} onSubmit={handleSubmit}>
            {/* <p className={s.googleText}>You can log in with your Google Account:</p>
            <button
                onClick={() => {
                    login();
                }}
                className={s.googleBtn}
                type="button"
            >
                <img src={GoogleLogo} alt="Google logo" />
            </button> */}
            <h2 className={s.formHeading}>Register</h2>
            <label className={s.formLabel}>
                <input
                    className={s.formInput}
                    type="email"
                    name="email"
                    value={formFields.email}
                    onChange={handleChange}
                    title="Please enter valid email address, for example  'example@gmail.com'"
                    placeholder="Email *"
                    min-length="6"
                    required
                />
            </label>
            <label className={s.formLabel}>
                <input
                    className={s.formInput}
                    type="email"
                    name="email"
                    value={formFields.email}
                    onChange={handleChange}
                    title="Please enter valid email address, for example  'example@gmail.com'"
                    placeholder="Email *"
                    min-length="6"
                    required
                />
            </label>
            <label className={s.formLabel}>
                <input
                    className={s.formInput}
                    type="password"
                    name="password"
                    value={formFields.password}
                    onChange={handleChange}
                    title="Please enter your password. Minimum length 8 symbols"
                    placeholder="Password *"
                    min-length="8"
                    required
                />
            </label>

            <button type="submit" className={s.formBtn}>
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
