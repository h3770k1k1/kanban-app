const { validateSignUpForm } = require('../components/validateSignUpForm');

describe('validateSignUpForm', () => {
    test('Should return valid for correct email, password, and matching passwords', () => {
        const result = validateSignUpForm("test@example.com", "password123", "password123");
        expect(result.isValid).toBe(true);
        expect(result.isEmailValid).toBe(true);
        expect(result.isPasswordValid).toBe(true);
        expect(result.isPasswordsMatch).toBe(true);
    });

    test('Should invalidate for incorrect email', () => {
        const result = validateSignUpForm("invalid-email", "password123", "password123");
        expect(result.isValid).toBe(false);
        expect(result.isEmailValid).toBe(false);
    });

    test('Should invalidate for short password', () => {
        const result = validateSignUpForm("test@example.com", "123", "123");
        expect(result.isValid).toBe(false);
        expect(result.isPasswordValid).toBe(false);
    });

    test('Should invalidate for non-matching passwords', () => {
        const result = validateSignUpForm("test@example.com", "password123", "password321");
        expect(result.isValid).toBe(false);
        expect(result.isPasswordsMatch).toBe(false);
    });

    test('Should invalidate for all invalid inputs', () => {
        const result = validateSignUpForm("invalid", "123", "321");
        expect(result.isValid).toBe(false);
    });

    test('Should validate for edge case with "@" in email', () => {
        const result = validateSignUpForm("user@domain.com", "abcdef", "abcdef");
        expect(result.isValid).toBe(true);
    });
});
