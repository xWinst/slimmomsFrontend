import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
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
    const lang = useSelector(state => state.user.lang);
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
                        required: lang.requiredField,
                        minLength: {
                            value: 2,
                            message: lang.nameRange,
                        },
                        maxLength: 15,
                    })}
                    className={s.formInput}
                    title={lang.nameValidation}
                    placeholder={lang.namePlaceholder}
                />
                <div className={s.errorCont}>
                    {errors.name && (
                        <p className={s.errorText}>
                            {errors.name.message || lang.nameNotValide}
                        </p>
                    )}
                </div>
            </label>

            <label className={s.formLabel}>
                <input
                    {...register('email', {
                        required: lang.requiredField,
                        minLength: {
                            value: 6,
                            message: lang.emailRange,
                        },
                    })}
                    className={s.formInput}
                    type="email"
                    title={lang.emailValidation}
                    placeholder={lang.emailPlaceholder}
                />
                <div className={s.errorCont}>
                    {errors.email && (
                        <p className={s.errorText}>
                            {errors.email.message || lang.emailNotValide}
                        </p>
                    )}
                </div>
            </label>

            <label className={s.formLabel}>
                <input
                    {...register('password', {
                        required: lang.requiredField,
                        minLength: {
                            value: 6,
                            message: lang.passwordRange,
                        },
                    })}
                    className={s.formInput}
                    type="password"
                    title={lang.passwordValidation}
                    placeholder={lang.passwordPlaceholder}
                />
                <div className={s.errorCont}>
                    {errors.password && (
                        <p className={s.errorText}>
                            {errors.password.message || lang.passwordNotValide}
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
