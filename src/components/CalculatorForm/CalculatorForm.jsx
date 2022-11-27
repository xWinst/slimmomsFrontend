import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setDailyRate } from 'redux/userOperations';
import { HarmfulProductsList, Modal } from 'components';
import s from './CalculatorForm.module.css';

const CalculatorForm = ({ submit = true }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [rate, setRate] = useState();
    const [blood, setBlood] = useState();
    const {
        register,
        formState: { errors, isValid },
        watch,
        handleSubmit,
        reset,
    } = useForm({ mode: 'onBlur' });
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
        if (submit) dispatch(setDailyRate({ dailyRate, bloodGroup }));
        else setIsShowModal(true);
        reset();
    };

    const close = () => {
        setIsShowModal(false);
    };

    const confirm = () => {
        setIsShowModal(false); //Перейти на регистрацию
    };

    const getClass = n => (watch('bloodGroup') === n ? s.checked : s.label);

    console.log('bb', watch('bloodGroup'));
    return (
        <div className={s.container}>
            <h2 className={s.title}>
                Calculate your daily calorie <br />
                intake right now
            </h2>
            <form className={s.form}>
                <label>
                    <input
                        className={s.input2}
                        type="number"
                        {...register('height', {
                            required: 'This is a required field',
                            min: {
                                value: 100,
                                message: 'Height must be between 100 - 220 cm',
                            },
                            max: {
                                value: 220,
                                message: 'Height must be between 100 - 220 cm',
                            },
                        })}
                        placeholder="Height *"
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
                        {...register('desiredWeight', {
                            required: 'This is a required field',
                            min: {
                                value: 40,
                                message:
                                    'Desired weight must be between 40 - 120 kg',
                            },
                            max: {
                                value: 120,
                                message:
                                    'Desired weight must be between 40 - 120 kg',
                            },
                        })}
                        placeholder="Desired weight *"
                    />
                    <p className={s.error}>
                        {errors?.desiredWeight ? (
                            `* ${errors.desiredWeight.message}`
                        ) : (
                            <>&nbsp;</>
                        )}
                    </p>
                </label>
                <label>
                    <input
                        className={s.input2}
                        type="number"
                        {...register('age', {
                            required: 'This is a required field',
                            min: {
                                value: 15,
                                message:
                                    'Age must be between 15 - 99 years old',
                            },
                            max: {
                                value: 99,
                                message:
                                    'Age must be between 15 - 99 years old',
                            },
                        })}
                        placeholder="Age *"
                    />
                    <p className={s.error}>
                        {errors?.age ? `* ${errors.age.message}` : <>&nbsp;</>}
                    </p>
                </label>
                <legend className={s.input}>Blood type *</legend>
                <label>
                    <input
                        className={s.input}
                        type="number"
                        {...register('weight', {
                            required: 'This is a required field',
                            min: {
                                value: 40,
                                message:
                                    'Current weight must be between 40 - 250 kg',
                            },
                            max: {
                                value: 250,
                                message:
                                    'Current weight must be between 40 - 250 kg',
                            },
                        })}
                        placeholder="Current weight *"
                    />
                    <p className={s.error}>
                        {errors?.weight ? (
                            `* ${errors.weight.message}`
                        ) : (
                            <>&nbsp;</>
                        )}
                    </p>
                </label>
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
                <button
                    className={s.btn}
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isValid}
                >
                    Start losing weight
                </button>
            </form>
            {isShowModal && (
                <Modal onClose={close} onConfirm={confirm}>
                    <div className={s.modalContainer}>
                        <p className={s.modalTitle}>
                            {' '}
                            Your recommended daily calorie intake is
                        </p>
                        <p className={s.rate}>
                            <span className={s.value}>{rate}</span>{' '}
                            &nbsp;&nbsp;kcal
                        </p>
                        <div className={s.line}></div>
                        <p className={s.text}>Foods you should not eat</p>
                        <HarmfulProductsList blood={blood} />
                        <button
                            className={s.btnCenter}
                            type="submit"
                            onClick={close}
                        >
                            Start losing weight
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CalculatorForm;
