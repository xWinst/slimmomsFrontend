import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registration } from 'redux/userOperations';
import { Button } from 'components';
import GoogleLogo from 'images/googleLogo.svg';
import s from '../LoginForm/LoginForm.module.css';

const RegisterForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onSubmit' });

    const dispatch = useDispatch();

    const onHandleSubmit = data => {
        dispatch(registration(data));
        reset();
    };

    return (
        <form className={s.loginForm} onSubmit={handleSubmit(onHandleSubmit)}>
            <h2 className={s.formHeading}>Register</h2>
            <label className={s.formLabel}>
                <input
                    {...register('name', {
                        required: 'This is a required field',
                        minLength: {
                            value: 2,
                            message: 'Minimum name length - 6 symbols',
                        },
                        maxLength: 15,
                    })}
                    className={s.formInput}
                    title="Please enter your name"
                    placeholder="Name *"
                />
                <div className={s.errorCont}>
                    {errors.name && (
                        <p className={s.errorText}>
                            {errors.name.message || 'Invalid name'}
                        </p>
                    )}
                </div>
            </label>

            <label className={s.formLabel}>
                <input
                    {...register('email', {
                        required: 'This is a required field',
                        minLength: {
                            value: 6,
                            message: 'Minimum email length - 6 symbols',
                        },
                    })}
                    className={s.formInput}
                    type="email"
                    title="Please enter valid email address, for example  'example@gmail.com'"
                    placeholder="Email *"
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
                        required: 'This is a required field',
                        minLength: {
                            value: 6,
                            message: 'Minimum password length - 6 symbols',
                        },
                    })}
                    className={s.formInput}
                    type="password"
                    title="Please enter your password. Minimum length 8 symbols"
                    placeholder="Password *"
                />
                <div className={s.errorCont}>
                    {errors.password && (
                        <p className={s.errorText}>
                            {errors.password.message || 'Invalid password'}
                        </p>
                    )}
                </div>
            </label>

            <Button type="submit">Register</Button>
            <a
                className={s.googleBtn}
                href={`${process.env.REACT_APP_BASE_URL}/users/google`}
            >
                <img src={GoogleLogo} alt="Google logo" />
            </a>
        </form>
    );
};

export default RegisterForm;
