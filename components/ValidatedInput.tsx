/**
 * An input wrapper that runs native browser validation first and then runs
 * optional custom validators. When a validator fails, it sets the custom
 * validity message and optionally calls onWarning.
 *
 * @param {Props} props - Component props
 * @param {Array<Function>} props.customValidators - custom validator functions
 * @param {Function} props.onWarning - callback when validation fails
 * @returns {JSX.Element} input element with validation behavior
 */
import React from 'react'
import { ValidationResponse } from '@/utils/validators';

type Props = {
    customValidators?: Array<(input: string) => ValidationResponse>;
    onWarning?: () => void;
    [key: string]: any; // other input attributes
}

function ValidatedInput({customValidators, onWarning,...attributes}: Props) {
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement;

        // Use built-in validation first
        input.setCustomValidity("");
        if (!input.validity.valid) {
            onWarning && onWarning();
            return;
        }

        // Then run custom validators
        if (customValidators) {
            for (const validator of customValidators) {
                const [isValid, message]: ValidationResponse = validator(input.value);
                if (!isValid) {
                    input.setCustomValidity(message);
                    input.reportValidity();
                    onWarning && onWarning();
                    return;
                }
            }
        }
    }

    return (
            <input onInput={handleInputChange} {...attributes} />
    )
}

export default ValidatedInput