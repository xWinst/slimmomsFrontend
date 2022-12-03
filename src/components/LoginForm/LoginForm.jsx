import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'redux/userOperations';
import { Button } from 'components';
import GoogleLogo from 'images/googleLogo.svg';
import s from './LoginForm.module.css';

const LoginForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onSubmit' });
    const lang = useSelector(state => state.user.lang);
    const dispatch = useDispatch();

    const onHandleSubmit = data => {
        dispatch(logIn(data));
        reset();
    };

    return (
        <form className={s.loginForm} onSubmit={handleSubmit(onHandleSubmit)}>
            <h2 className={s.formHeading}>Sign in</h2>
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

            <Button type="submit">{lang.loginText}</Button>
            <a
                className={s.googleBtn}
                href={`${process.env.REACT_APP_BASE_URL}/users/google`}
            >
                <img src={GoogleLogo} alt="Google logo" />
            </a>
        </form>
    );
};

export default LoginForm;
