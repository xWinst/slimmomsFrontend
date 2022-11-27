import s from '../LoginForm/LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registration } from 'redux/userOperations';

const RegisterForm = () => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({ mode: 'onBlur' });

    const dispatch = useDispatch();
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

    const onHandleSubmit = e => {
        e.preventDefault();

        dispatch(registration(formFields));

        reset();
    };
    return (
        <form className={s.loginForm} onSubmit={handleSubmit(onHandleSubmit)}>
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
                    {...register('name', {
                        required: 'Need to feel up this field',
                        minLength: { value: 6, message: 'Minimum name length - 6 symbols' },
                        maxLength: 15,
                    })}
                    className={s.formInput}
                    type="text"
                    name="name"
                    value={formFields.name}
                    onChange={handleChange}
                    title="Please enter your name"
                    placeholder="Name *"
                    min-length="4"
                    required
                />
                <div className={s.errorCont}>
                    {errors.name && <p className={s.errorText}>{errors.name.message || 'Invalid name'}</p>}
                </div>
            </label>

            <label className={s.formLabel}>
                <input
                    {...register('email', {
                        required: 'Need to feel up this field',
                        minLength: { value: 6, message: 'Minimum email length - 6 symbols' },
                    })}
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
                <div className={s.errorCont}>
                    {errors.email && <p className={s.errorText}>{errors.email.message || 'Invalid email'}</p>}
                </div>
            </label>

            <label className={s.formLabel}>
                <input
                    {...register('password', {
                        required: 'Need to feel up this field',
                        minLength: { value: 6, message: 'Minimum password length - 6 symbols' },
                    })}
                    className={s.formInput}
                    type="password"
                    name="password"
                    value={formFields.password}
                    onChange={handleChange}
                    title="Please enter your password. Minimum length 8 symbols"
                    placeholder="Password *"
                    min-length="6"
                    required
                />
                <div className={s.errorCont}>
                    {errors.password && <p className={s.errorText}>{errors.password.message || 'Invalid password'}</p>}
                </div>
            </label>

            <button type="submit" disabled={!isValid} className={s.formBtn}>
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
