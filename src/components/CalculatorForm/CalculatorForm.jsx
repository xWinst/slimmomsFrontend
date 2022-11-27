import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setDailyRate } from 'redux/userOperations';
import { Modal } from 'components';
import s from './CalculatorForm.module.css';

const CalculatorForm = ({ submit = true }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onBlur' });
    const dispatch = useDispatch();

    const onSubmit = data => {
        const { height, desiredWeight, age, weight, group } = data;
        const dailyRate =
            10 * weight +
            6.25 * height -
            5 * age -
            161 -
            10 * (weight - desiredWeight);
        if (submit) dispatch(setDailyRate({ dailyRate }));
        else setIsShowModal(true);
        reset();
    };

    const close = () => {
        setIsShowModal(false);
    };

    const confirm = () => {
        setIsShowModal(false); //Перейти на регистрацию
    };

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
                        className={s.input}
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
                <fieldset className={s.group} {...register('group')}>
                    <div className={s.btns}>
                        <label>
                            <input
                                type="radio"
                                id="1"
                                name="BloodType"
                                value="1"
                                checked
                            />
                            &nbsp;1
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="2"
                                name="BloodType"
                                value="2"
                            />
                            &nbsp;2
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="3"
                                name="BloodType"
                                value="3"
                            />
                            &nbsp;3
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="4"
                                name="BloodType"
                                value="4"
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
                    {}
                </Modal>
            )}
        </div>
    );
};

export default CalculatorForm;
