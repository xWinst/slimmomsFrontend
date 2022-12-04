import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setDailyRate } from 'redux/userOperations';
import { HarmfulProductsList, Modal, Button, Icon } from 'components';
import s from './CalculatorForm.module.css';

const CalculatorForm = ({ submit = true }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [rate, setRate] = useState();
    const [blood, setBlood] = useState();
    const date = useSelector(state => state.product.date);
    const lang = useSelector(state => state.user.lang);
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
        reset,
    } = useForm({ mode: 'onSumbit' });
    const dispatch = useDispatch();

    const onSubmit = data => {
        const { height, desiredWeight, age, weight, bloodGroup } = data;
        const dailyRate =
            10 * weight +
            6.25 * height -
            5 * age -
            161 -
            10 * (weight - desiredWeight);
        setRate(dailyRate);
        setBlood(bloodGroup);
        if (submit)
            dispatch(setDailyRate({ date, dailyRate, weight, bloodGroup }));
        else setIsShowModal(true);
        reset();
    };

    const close = () => {
        setIsShowModal(false);
    };

    const confirm = () => {
        setIsShowModal(false);
        navigate('/register');
    };

    const getClass = n => (watch('bloodGroup') === n ? s.checked : s.label);

    return (
        <div className={s.container}>
            <h2 className={s.title}>
                {lang.caclulateTitleStart} <br />
                {lang.caclulateTitleFinish}
            </h2>
            <form>
                <div className={s.form}>
                    <label>
                        <input
                            className={s.input}
                            type="number"
                            {...register('height', {
                                required: lang.requiredField,
                                min: {
                                    value: 100,
                                    message: lang.heightRange,
                                },
                                max: {
                                    value: 220,
                                    message: lang.heightRange,
                                },
                            })}
                            placeholder={lang.placeholderHeight}
                        />
                        <p className={s.error}>
                            {errors?.height ? (
                                `* ${errors.height.message}`
                            ) : (
                                <>&nbsp;</>
                            )}
                        </p>
                    </label>
                    <label>
                        <input
                            className={s.input}
                            type="number"
                            {...register('age', {
                                required: lang.requiredField,
                                min: {
                                    value: 15,
                                    message: lang.ageRange,
                                },
                                max: {
                                    value: 99,
                                    message: lang.ageRange,
                                },
                            })}
                            placeholder={lang.placeholderAge}
                        />
                        <p className={s.error}>
                            {errors?.age ? (
                                `* ${errors.age.message}`
                            ) : (
                                <>&nbsp;</>
                            )}
                        </p>
                    </label>
                    <label>
                        <input
                            className={s.input}
                            type="number"
                            {...register('weight', {
                                required: lang.requiredField,
                                min: {
                                    value: 40,
                                    message: lang.weightRange,
                                },
                                max: {
                                    value: 250,
                                    message: lang.weightRange,
                                },
                            })}
                            placeholder={lang.placeholderWeight}
                        />
                        <p className={s.error}>
                            {errors?.weight ? (
                                `* ${errors.weight.message}`
                            ) : (
                                <>&nbsp;</>
                            )}
                        </p>
                    </label>
                    <label>
                        <input
                            className={s.input}
                            type="number"
                            {...register('desiredWeight', {
                                required: lang.requiredField,
                                min: {
                                    value: 40,
                                    message: lang.desiredWeightRange,
                                },
                                max: {
                                    value: 120,
                                    message: lang.desiredWeightRange,
                                },
                            })}
                            placeholder={lang.placeholderDesiredWeight}
                        />
                        <p className={s.error}>
                            {errors?.desiredWeight ? (
                                `* ${errors.desiredWeight.message}`
                            ) : (
                                <>&nbsp;</>
                            )}
                        </p>
                    </label>
                    <legend className={s.legend}>{lang.bloodType}</legend>
                    <fieldset className={s.group} {...register('bloodGroup')}>
                        <div className={s.btns}>
                            <label className={getClass('1')}>
                                <input
                                    className={s.radio}
                                    type="radio"
                                    {...register('bloodGroup')}
                                    value={1}
                                    defaultChecked
                                />
                                &nbsp;1
                            </label>
                            <label className={getClass('2')}>
                                <input
                                    className={s.radio}
                                    type="radio"
                                    value={2}
                                    {...register('bloodGroup')}
                                />
                                &nbsp;2
                            </label>
                            <label className={getClass('3')}>
                                <input
                                    className={s.radio}
                                    type="radio"
                                    value={3}
                                    {...register('bloodGroup')}
                                />
                                &nbsp;3
                            </label>
                            <label className={getClass('4')}>
                                <input
                                    className={s.radio}
                                    type="radio"
                                    value={4}
                                    {...register('bloodGroup')}
                                />
                                &nbsp;4
                            </label>
                        </div>
                    </fieldset>
                </div>
                <Button
                    cn="width"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                >
                    {lang.buttonStartloseweight}
                </Button>
            </form>
            {isShowModal && (
                <Modal onClose={close}>
                    <div className={s.modalContainer}>
                        <div className={s.close}>
                            <Icon
                                className={s.goBack}
                                icon="goBack"
                                width="15"
                                height="9"
                                onClick={close}
                            />
                        </div>
                        <p className={s.modalTitle}>
                            {lang.modalTitleStart}
                            <br /> {lang.modalTitleFinish}
                        </p>
                        <p className={s.rate}>
                            <span className={s.value}>{rate}</span>
                            &nbsp;&nbsp;kcal
                        </p>
                        <div className={s.line}></div>
                        <p className={s.text}>{lang.modalListTitle}</p>
                        <HarmfulProductsList blood={blood} />
                        <Button cn="modal" type="submit" onClick={confirm}>
                            {lang.buttonStartloseweight}
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CalculatorForm;
