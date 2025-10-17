import registeredEmails from "@/data/registeredEmails";

/**
 * Tuple shape used by validators: [isValid, message]
 */
export type ValidationResponse = [boolean, string];

// Constants
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;

// Regexes
const HAS_LOWERCASE = /[a-z]/;
const HAS_UPPERCASE = /[A-Z]/;
const HAS_NUMBER = /\d/;
const HAS_SPECIAL = /[!@#$%^&*(),.?":{}|<>]/; 

/**
 * Validate password complexity. 
 */
export function isComplexPassword(password: string): ValidationResponse {
    const isAboveMinLength = (password ?? '').length >= PASSWORD_MIN_LENGTH;
    const isBelowMaxLength = (password ?? '').length <= PASSWORD_MAX_LENGTH;
    const hasOneLowerCase = HAS_LOWERCASE.test(password);
    const hasOneUpperCase = HAS_UPPERCASE.test(password);
    const hasOneNumber = HAS_NUMBER.test(password);
    const hasOneSpecialChar = HAS_SPECIAL.test(password);

    const isValid = isAboveMinLength && isBelowMaxLength && hasOneLowerCase && hasOneUpperCase && hasOneNumber && hasOneSpecialChar;

    if (!isValid) {
        return [false, `Password must be between ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters and include at least one lowercase letter, one uppercase letter, one number, and one special character.`];
    }

    return [true, 'success'];
}

/**
 * Check that an email is not already registered.
 */
export function isUnregisteredEmail(email: string): ValidationResponse {
    email = (email ?? '').trim();
    const isValid = !registeredEmails.includes(email);
    if (!isValid) {
        return [false, 'Email is already registered'];
    }
    return [true, 'success'];
}

/**
 * Ensure the email ends with @gmail.com. 
 */
export function endsWithGmail(email: string): ValidationResponse {
    email = (email ?? '').toLowerCase().trim();
    const isValid = email.endsWith('@gmail.com');
    if (!isValid) {
        return [false, 'Email must end with @gmail.com'];
    }
    return [true, 'success'];
}
