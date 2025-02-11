export class SignUpValidator {
    static validate({ email, password, confirmedPassword }) {
        const isEmailValid = email.includes('@');
        const isPasswordValid = password.length >= 6;
        const isPasswordsMatch = password === confirmedPassword;

        return {
            isValid: isEmailValid && isPasswordValid && isPasswordsMatch,
            isEmailValid,
            isPasswordValid,
            isPasswordsMatch,
            errors: {
                email: isEmailValid ? '' : 'Email is invalid.',
                password: isPasswordValid ? '' : 'Password must be at least 6 characters long.',
                confirmedPassword: isPasswordsMatch ? '' : 'Passwords do not match.',
            },
        };
    }
}
