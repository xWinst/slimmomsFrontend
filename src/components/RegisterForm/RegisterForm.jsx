import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registration } from 'redux/userOperations';
import { Button, Icon } from 'components';
import s from '../LoginForm/LoginForm.module.css';

const RegisterForm = () => {
    const [isOpenEye, setIsOpenEye] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onSubmit' });
    const lang = useSelector(state => state.user.lang);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onHandleSubmit = data => {
        dispatch(registration(data));
        reset();
        navigate('/login');
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
                <h2 className={s.formHeading}>{lang.registerText}</h2>
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

                <Button type="submit">Register</Button>
            </form>
            <div className={s.social}>
                <p className={s.socialTitle}>{lang.socialTitle}</p>
                <a
                    className={s.googleBtn}
                    href={`${process.env.REACT_APP_BASE_URL}/users/google`}
                >
                    <Icon icon="google" width="26" height="26" />
                    Google
                </a>

                <a
                    className={s.googleBtn}
                    href={`${process.env.REACT_APP_BASE_URL}/users/facebook`}
                >
                    <Icon icon="facebook" width="32" height="32" />
                    Facebook
                </a>
            </div>
        </div>
    );
};

export default RegisterForm;
