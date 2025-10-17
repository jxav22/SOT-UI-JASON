/**
 * A user registration form component that utilizes custom and native validation.
 * Displays status feedback (idle, warning, failure, success) based on validation results.
 * Integrates with `ValidatedInput` for each field, supporting custom validators and warning callbacks.
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} The registration form element with validation and status styling.
 */
import React from 'react'
import styles from './Form.module.css'
import { Status } from '@/utils/enums';

import ValidatedInput from './ValidatedInput'
import { isUnregisteredEmail, endsWithGmail, isComplexPassword } from '@/utils/validators';

type Props = {}


function Form({ }: Props) {
    const [status, setStatus] = React.useState<Status>(Status.Idle);
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleWarning = () => {
        setStatus(Status.Warning);
    }

    const handleSuccess = () => {
        setStatus(Status.Success);
    }

    const handleFailure = () => {
        setStatus(Status.Failure);
    }

    const validateForm = () => {
        const form = formRef.current;
        if (!form) return;

        if (!form.checkValidity()) {
            handleFailure();
            return;
        }
        handleSuccess();
    }

    const getStatusStyle = () => {
        switch (status) {
            case Status.Idle: return styles['form--idle'];
            case Status.Warning: return styles['form--warning'];
            case Status.Failure: return styles['form--failure'];
            case Status.Success: return styles['form--success'];
            default: return '';
        }
    }

    return (
        <form className={`${styles.form} ${getStatusStyle()}`} ref={formRef}>
            <h1 className={styles.form__title}>User Registration Form</h1>
            <p className={styles.form__row}>
                <label htmlFor="firstname">First Name</label>
                <ValidatedInput
                    id="firstname"
                    name="firstname"
                    type="text"
                    required
                    onWarning={handleWarning}
                />
            </p>
            <p className={styles.form__row}>
                <label htmlFor="lastname">Last Name</label>
                <ValidatedInput
                    id="lastname"
                    name="lastname"
                    type="text"
                    required
                    onWarning={handleWarning}
                />
            </p>
            <p className={styles.form__row}>
                <label htmlFor="email">Email</label>
                <ValidatedInput
                    id="email"
                    name="email"
                    type="email"
                    required
                    onWarning={handleWarning}
                    customValidators={[isUnregisteredEmail, endsWithGmail]}
                />

            </p>
            <p className={styles.form__row}>
                <label htmlFor="password">Password</label>
                <ValidatedInput
                    id="password"
                    name="password"
                    type="password"
                    required
                    onWarning={handleWarning}
                    customValidators={[isComplexPassword]}
                />
            </p>
            <button type="submit" onClick={validateForm}>Submit</button>
        </form>
    );
}

export default Form