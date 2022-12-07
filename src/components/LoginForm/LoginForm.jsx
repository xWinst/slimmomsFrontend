import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'redux/userOperations';
import { Button, Icon } from 'components';
import s from './LoginForm.module.css';

const LoginForm = () => {
    const [isOpenEye, setIsOpenEye] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onSubmit' });
    const lang = useSelector(state => state.user.lang);
    const dispatch = useDispatch();

    const onHandleSubmit = data => {
        data.email = data.email.toLowerCase();
        dispatch(logIn(data));
        reset();
    };

    const showPassword = () => {
        setIsOpenEye(state => !state);
    };

    return (
        <div className={s.container}>
            <form
                className={s.loginForm}
                onSubmit={handleSubmit(onHandleSubmit)}
            >
                <h2 className={s.formHeading}>{lang.login}</h2>
                <label className={s.formLabel}>
                    <input
                        {...register('email', {
                            required: lang.requiredField,
                            pattern: {
                                value: /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{2,6}$/,
                                message: lang.invalidEmail,
                            },
                        })}
                        className={s.formInput}
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
                        type={isOpenEye ? 'text' : 'password'}
                        title={lang.passwordValidation}
                        placeholder={lang.passwordPlaceholder}
                    />
                    <Icon
                        className={s.icon}
                        icon={isOpenEye ? `eye` : `closedEye`}
                        onClick={showPassword}
                        width="20"
                        height="20"
                    />
                    <div className={s.errorCont}>
                        {errors.password && (
                            <p className={s.errorText}>
                                {errors.password.message ||
                                    lang.passwordNotValide}
                            </p>
                        )}
                    </div>
                </label>

                <Button type="submit">{lang.loginText}</Button>
            </form>
            <div className={s.social}>
                <p className={s.socialTitle}>{lang.socialTitle}</p>
                <a
                    className={s.googleBtn}
                    href={`${process.env.REACT_APP_BASE_URL}/users/google`}
                >
                    <Icon icon="google" width="26" height="26" />
                    <div>
                        <span className={s.blue}>G</span>
                        <span className={s.red}>o</span>
                        <span className={s.yellow}>o</span>
                        <span className={s.blue}>g</span>
                        <span className={s.green}>l</span>
                        <span className={s.red}>e</span>
                    </div>
                </a>

                <a
                    className={s.facebookBtn}
                    href={`${process.env.REACT_APP_BASE_URL}/users/facebook`}
                >
                    <Icon icon="facebook" width="32" height="32" />
                    facebook
                </a>
            </div>
        </div>
    );
};

export default LoginForm;
