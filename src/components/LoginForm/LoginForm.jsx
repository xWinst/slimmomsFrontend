import s from './LoginForm.module.css';
import GoogleLogo from '../../images/googleLogo.svg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/userOperations';

const LoginForm = () => {
    const {
        register,
        formState: { errors, isValid },
        // handleSubmit,
    } = useForm({ mode: 'onBlur' });
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        setFormFields(prevState => ({ ...prevState, [name]: value }));
    };

    const reset = () => {
        setFormFields({
            email: '',
            password: '',
        });
    };

    const onHandleSubmit = e => {
        e.preventDefault();
        dispatch(logIn(formFields));

        reset();
    };
    return (
        <form className={s.loginForm} onSubmit={onHandleSubmit}>
            <h2 className={s.formHeading}>Log in</h2>
            <label className={s.formLabel}>
                <input
                    {...register('email', {
                        required: 'Need to feel up this field',
                        minLength: {
                            value: 6,
                            message: 'Minimum email length - 6 symbols',
                        },
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
                    {errors.email && (
                        <p className={s.errorText}>
                            {errors.email.message || 'Invalid email'}
                        </p>
                    )}
                </div>
            </label>
            <label className={s.formLabel}>
                <input
                    {...register('password', {
                        required: 'Need to feel up this field',
                        minLength: {
                            value: 6,
                            message: 'Minimum password length - 6 symbols',
                        },
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
                    {errors.password && (
                        <p className={s.errorText}>
                            {errors.password.message || 'Invalid password'}
                        </p>
                    )}
                </div>
            </label>

            <button type="submit" disabled={!isValid} className={s.formBtn}>
                Login
            </button>
            <a
                className={s.googleBtn}
                href="http://localhost:4000/api/users/google"
            >
                <img src={GoogleLogo} alt="Google logo" />
            </a>
        </form>
    );
};

export default LoginForm;
