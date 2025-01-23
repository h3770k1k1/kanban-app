export const validateForm = (email, password, confirmPassword) => {
    const isEmailValid = email.includes('@');
    const isPasswordValid = password.length >= 6;
    const isPasswordsMatch = password === confirmPassword;

    return {
        isValid: isEmailValid && isPasswordValid && isPasswordsMatch,
        isEmailValid,
        isPasswordValid,
        isPasswordsMatch,
    };
};